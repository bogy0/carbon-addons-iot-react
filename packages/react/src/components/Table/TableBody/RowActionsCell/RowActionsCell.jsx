import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DataTable, Loading } from 'carbon-components-react';
import classnames from 'classnames';
import { omit } from 'lodash-es';

import Button from '../../../Button';
import { settings } from '../../../../constants/Settings';
import { RowActionPropTypes, RowActionErrorPropTypes } from '../../TablePropTypes';
import icons from '../../../../utils/bundledIcons';
import { OverflowMenu } from '../../../OverflowMenu';
import { OverflowMenuItem } from '../../../OverflowMenuItem';

import RowActionsError from './RowActionsError';

const { TableCell } = DataTable;
const { iotPrefix } = settings;

const propTypes = {
  /** Unique id for each row, passed back for each click */
  id: PropTypes.string.isRequired,
  /** Unique id for the table */
  tableId: PropTypes.string.isRequired,
  /** Array with all the actions to render */
  actions: RowActionPropTypes,
  /** Callback called if a row action is clicked */
  onApplyRowAction: PropTypes.func.isRequired,
  /** translated text for more actions */
  overflowMenuAria: PropTypes.string,
  /** Is a row action actively running */
  isRowActionRunning: PropTypes.bool,
  /** row action error out */
  rowActionsError: RowActionErrorPropTypes,
  onClearError: PropTypes.func,
  /** I18N label for in progress */
  inProgressText: PropTypes.string,
  /** I18N label for action failed */
  actionFailedText: PropTypes.string, // eslint-disable-line react/require-default-props
  /** I18N label for learn more */
  learnMoreText: PropTypes.string, // eslint-disable-line react/require-default-props
  /** I18N label for dismiss */
  dismissText: PropTypes.string, // eslint-disable-line react/require-default-props
  /** `true` to make this menu item a divider. */
  hasDivider: PropTypes.bool,
  /** `true` to make this menu item a "danger button". */
  isDelete: PropTypes.bool,
  /** `true` hides all the normal actions/statuses and shows the singleRowEditButtons */
  showSingleRowEditButtons: PropTypes.bool,
  singleRowEditButtons: PropTypes.element,
  /**
   * Direction of document. Passed in at Table
   */
  langDir: PropTypes.oneOf(['ltr', 'rtl']),
};

const defaultProps = {
  actions: null,
  isRowActionRunning: false,
  rowActionsError: null,
  overflowMenuAria: 'More actions',
  inProgressText: 'In progress',
  onClearError: null,
  hasDivider: false,
  isDelete: false,
  showSingleRowEditButtons: false,
  singleRowEditButtons: null,
  langDir: 'ltr',
};

const renderBundledIconUsingName = (iconName, label) => {
  const Icon = icons[iconName];
  return <Icon aria-label={label} />;
};

class RowActionsCell extends React.Component {
  state = {
    isOpen: false,
  };

  handleOpen = () => {
    const { isOpen } = this.state;
    if (!isOpen) {
      this.setState({ isOpen: true });
    }
  };

  handleClose = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({ isOpen: false });
    }
  };

  onClick = (e, id, action, onApplyRowAction) => {
    onApplyRowAction(action, id);
    e.preventDefault();
    e.stopPropagation();
    this.handleClose();
  };

  render() {
    const {
      id,
      tableId,
      actions,
      onApplyRowAction,
      overflowMenuAria,
      actionFailedText,
      learnMoreText,
      dismissText,
      isRowActionRunning,
      rowActionsError,
      onClearError,
      inProgressText,
      showSingleRowEditButtons,
      singleRowEditButtons,
      langDir,
    } = this.props;
    const { isOpen } = this.state;
    const overflowActions = actions ? actions.filter((action) => action.isOverflow) : [];
    const hasOverflow = overflowActions.length > 0;
    const firstSelectableItemIndex = overflowActions.findIndex((action) => !action.disabled);

    return showSingleRowEditButtons ? (
      <TableCell
        key={`${id}-single-row-edit-buttons`}
        className={`${iotPrefix}--row-actions-cell--table-cell`}
      >
        {singleRowEditButtons}
      </TableCell>
    ) : actions ? (
      <TableCell
        key={`${id}-row-actions-cell`}
        className={`${iotPrefix}--row-actions-cell--table-cell`}
      >
        <div className={`${iotPrefix}--row-actions-container`}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            data-testid="row-action-container-background"
            className={classnames(`${iotPrefix}--row-actions-container__background`, {
              [`${iotPrefix}--row-actions-container__background--overflow-menu-open`]: isOpen,
            })}
            onClick={(evt) => evt.stopPropagation()}
          >
            {rowActionsError ? (
              <RowActionsError
                actionFailedText={actionFailedText}
                learnMoreText={learnMoreText}
                dismissText={dismissText}
                rowActionsError={rowActionsError}
                onClearError={onClearError}
              />
            ) : isRowActionRunning ? (
              <Fragment>
                <Loading small withOverlay={false} />
                {inProgressText}
              </Fragment>
            ) : (
              <Fragment>
                {actions
                  .filter((action) => !action.isOverflow)
                  .map(({ id: actionId, labelText, iconDescription, ...others }) => (
                    <Button
                      {...omit(others, ['isOverflow', 'isDelete', 'isEdit', 'hasDivider'])}
                      iconDescription={labelText || iconDescription}
                      key={`${tableId}-${id}-row-actions-button-${actionId}`}
                      testId={`${tableId}-${id}-row-actions-button-${actionId}`}
                      kind="ghost"
                      hasIconOnly={!labelText}
                      tooltipPosition="left"
                      tooltipAlignment="end"
                      size="small"
                      onClick={(e) => this.onClick(e, id, actionId, onApplyRowAction)}
                    >
                      {labelText}
                    </Button>
                  ))}
                {hasOverflow ? (
                  <OverflowMenu
                    id={`${tableId}-${id}-row-actions-cell-overflow`}
                    data-testid={`${tableId}-${id}-row-actions-cell-overflow`}
                    flipped={langDir === 'ltr'}
                    ariaLabel={overflowMenuAria}
                    onClick={(event) => event.stopPropagation()}
                    iconDescription={overflowMenuAria}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    className={`${iotPrefix}--row-actions-cell--overflow-menu`}
                    selectorPrimaryFocus={`.${iotPrefix}--action-overflow-item--initialFocus`}
                    useAutoPositioning
                  >
                    {overflowActions.map((action, actionIndex) => (
                      <OverflowMenuItem
                        className={classnames(`${iotPrefix}--action-overflow-item`, {
                          [`${iotPrefix}--action-overflow-item--initialFocus`]:
                            actionIndex === firstSelectableItemIndex,
                        })}
                        data-testid={`${tableId}-${id}-row-actions-cell-overflow-menu-item-${action.id}`}
                        key={`${id}-row-actions-button-${action.id}`}
                        onClick={(e) => this.onClick(e, id, action.id, onApplyRowAction)}
                        requireTitle={!action.renderIcon}
                        hasDivider={action.hasDivider}
                        isDelete={action.isDelete}
                        itemText={
                          action.renderIcon ? (
                            <div
                              className={`${iotPrefix}--row-actions-cell--overflow-menu-content`}
                              title={action.labelText}
                            >
                              {typeof action.renderIcon === 'string' ? (
                                renderBundledIconUsingName(action.renderIcon, action.labelText)
                              ) : (
                                <action.renderIcon description={action.labelText} />
                              )}
                              {action.labelText}
                            </div>
                          ) : (
                            action.labelText
                          )
                        }
                        disabled={action.disabled}
                      />
                    ))}
                  </OverflowMenu>
                ) : null}
              </Fragment>
            )}
          </div>
        </div>
      </TableCell>
    ) : null;
  }
}

RowActionsCell.propTypes = propTypes;
RowActionsCell.defaultProps = defaultProps;

export default RowActionsCell;
