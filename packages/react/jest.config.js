const all90Covered = {
  statements: 90,
  branches: 90,
  functions: 90,
  lines: 90,
};

module.exports = {
  collectCoverageFrom: [
    'src/components/**/*.js?(x)',
    '!src/**/*.story.js?(x)',
    '!src/**/hooks/*.js',
    '!src/components/SuiteHeader/util/suiteHeaderData.js',
    '!src/components/SuiteHeader/util/uiresources.js',
    '!src/components/FileUploader/stories/*.jsx',
    '!src/components/Table/AsyncTable/*.js?(x)',
    '!src/components/WizardInline/**/*.js?(x)',
    '!src/components/Page/(EditPage|PageHero).jsx',
    '!src/components/Dashboard/(Dashboard|CardRenderer).jsx',
    '!src/components/MapCard/storyFiles/*.jsx',
    '!src/components/**/*.test.e2e.jsx',
    '!src/components/StorybookSnapshots.test.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/', '/coverage/'],
  coverageReporters: ['html', 'text-summary', 'lcov', 'json'],
  coverageDirectory: 'jest/coverage',
  coverageThreshold: {
    './src/components/TimePickerSpinner/TimePickerSpinner.jsx': all90Covered,
    './src/components/List/HierarchyList/HierarchyList.jsx': all90Covered,
    './src/components/ValueCard/ValueRenderer.jsx': all90Covered,
    './src/components/List/ListItem/ListItemWrapper.jsx': all90Covered,
    './src/components/Table/TableBody/RowActionsCell/RowActionsError.jsx': all90Covered,
    './src/components/Breadcrumb/Breadcrumb.jsx': all90Covered,
    './src/components/ValueCard/Attribute.jsx': all90Covered,
    './src/components/SuiteHeader/SuiteHeader.jsx': all90Covered,
    './src/components/Table/TableManageViewsModal/TableManageViewsModal.jsx': all90Covered,
    './src/components/ComposedModal/ComposedModal.jsx': all90Covered,
    './src/components/Table/TableBody/TableBodyRow/TableBodyRow.jsx': all90Covered,
    './src/components/TimeSeriesCard/timeSeriesUtils.js': all90Covered,
    './src/components/Accordion/AccordionItemDefer.jsx': all90Covered,
    './src/components/Card/CardRangePicker.jsx': all90Covered,
    './src/components/TableCard/tableCardUtils.jsx': all90Covered,
    './src/components/Table/TableBody/RowActionsCell/RowActionsCell.jsx': all90Covered,
    './src/components/ResourceList/ResourceList.jsx': all90Covered,
    './src/components/Table/Table.jsx': all90Covered,
    './src/components/IconDropdown/IconDropdown.jsx': all90Covered,
    './src/components/Table/TableHead/TableHead.jsx': all90Covered,
    './src/components/SuiteHeader/SuiteHeaderAppSwitcher/SuiteHeaderAppSwitcher.jsx': all90Covered,
    './src/components/BarChartCard/barChartUtils.js': all90Covered,
    './src/components/Table/TableSaveViewModal/TableSaveViewForm.jsx': all90Covered,
    './src/components/SideNav/SideNav.jsx': all90Covered,
    './src/components/ComposedStructuredList/ComposedStructuredList.jsx': all90Covered,
    './src/components/NavigationBar/NavigationBar.jsx': all90Covered,
    './src/components/TileCatalog/CatalogContent.jsx': all90Covered,
    './src/components/DashboardEditor/DashboardEditor.jsx': { branches: 65, functions: 71 },
    './src/components/BarChartCard/BarChartCard.jsx': {
      // TODO: Add tests for tooltip interaction and formatting when below issue is solved
      // https://github.com/carbon-design-system/carbon-charts/issues/594
      functions: 69,
    },
    './src/components/TimeSeriesCard/TimeSeriesCard.jsx': {
      // TODO: Add tests for tooltip interaction and formatting when below issue is solved
      // https://github.com/carbon-design-system/carbon-charts/issues/594
      functions: 74,
    },
    // Deprecated, no need for thresholds to be at 90%
    './src/components/Hero/Hero.jsx': { statements: 83, branches: 40, functions: 50, lines: 83 },
    './src/components/Dashboard/DashboardHeader.jsx': { branches: 83 },
  },
  globals: {
    __DEV__: false,
  },
  setupFiles: ['<rootDir>/config/jest/setup.js'],
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTest.js'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js?(x)',
    '<rootDir>/**/?(*.)(spec|test).js?(x)',
    '<rootDir>/**/?(*.)test.a11y.js?(x)',
  ],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.story\\.jsx?$': '@storybook/addon-storyshots/injectFileName',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.s?css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
  },
  testPathIgnorePatterns: ['/config/', '/lib/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@carbon/charts|@storybook/addon-docs)).+(.jsx?)',
    '/__mocks__/.+(.jsx?)',
  ],
  watchPathIgnorePatterns: ['/coverage/', '/results/', '/.git/'],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    // rewrite carbon-components(-react) es imports to lib/cjs imports because jest doesn't support es modules
    '@carbon/icons-react/es/(.*)': '@carbon/icons-react/lib/$1',
    'carbon-components-react/es/(.*)': 'carbon-components-react/lib/$1',
  },
};
