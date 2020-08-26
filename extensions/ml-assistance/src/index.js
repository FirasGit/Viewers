import tableList from './components/TableList';

export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'ml-assistance',

  /**
   * @param {object} params
   * @param {ServicesManager} params.servicesManager
   * @param {CommandsManager} params.commandsManager
   */
  getPanelModule({ servicesManager, commandsManager }) {
    return {
      menuOptions: [
        {
          icon: 'brain',
          label: 'Machine Learning',
          target: 'ml-assistance-tracker',
        },
      ],
      components: [
        {
          id: 'ml-assistance-tracker',
          component: tableList, //studyList, //MeasurementComparisonTable,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },

  /**
   * @param {object} params
   * @param {ServicesManager} params.servicesManager
   * @param {CommandsManager} params.commandsManager
   * @returns Object
   */
  getToolbarModule() {
    return null;
  },

  /**
   * @param {object} params
   * @param {ServicesManager} params.servicesManager
   * @param {CommandsManager} params.commandsManager
   * @returns Object
   */
  getCommandsModule() {
    return null;
  },
};
