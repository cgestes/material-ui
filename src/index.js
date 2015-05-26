module.exports = {
  AppBar: require('./app-bar'),
  AppCanvas: require('./app-canvas'),
  BeforeAfterWrapper: require('./before-after-wrapper'),
  Checkbox: require('./checkbox'),
  CircularProgress: require('./circular-progress'),
  ClearFix: require('./clearfix'),
  DatePicker: require('./date-picker/date-picker'),
  Dialog: require('./dialog'),
  DialogWindow: require('./dialog-window'),
  DropDownIcon: require('./drop-down-icon'),
  DropDownMenu: require('./drop-down-menu'),
  EnhancedButton: require('./enhanced-button'),
  FlatButton: require('./flat-button'),
  FloatingActionButton: require('./floating-action-button'),
  FontIcon: require('./font-icon'),
  IconButton: require('./icon-button'),
  LeftNav: require('./left-nav'),
  LinearProgress: require('./linear-progress'),
  Menu: require('./menu/menu'),
  MenuItem: require('./menu/menu-item'),
  Mixins: {
    Classable: require('./mixins/classable'),
    ClickAwayable: require('./mixins/click-awayable'),
    WindowListenable: require('./mixins/window-listenable'),
    StylePropable: require('./mixins/style-propable'),
    StyleResizable: require('./mixins/style-resizable')
  },
  Paper: require('./paper'),
  RadioButton: require('./radio-button'),
  RadioButtonGroup: require('./radio-button-group'),
  RaisedButton: require('./raised-button'),
  Slider: require('./slider'),
  SvgIcon: require('./svg-icon'),
  Icons: {
    NavigationMenu: require('./svg-icons/navigation-menu'),
    NavigationChevronLeft: require('./svg-icons/navigation-chevron-left'),
    NavigationChevronRight: require('./svg-icons/navigation-chevron-right')
  },
  Styles: {
    AutoPrefix: require('./styles/auto-prefix'),
    Colors: require('./styles/colors'),
    Spacing: require('./styles/spacing'),
    ThemeManager: require('./styles/theme-manager'),
    Transitions: require('./styles/transitions'),
    Typography: require('./styles/typography')
  },
  Snackbar: require('./snackbar'),
  Tab: require('./tabs/tab'),
  Tabs: require('./tabs/tabs'),
  Toggle: require('./toggle'),
  TimePicker: require('./time-picker'),
  TextField: require('./text-field'),
  Toolbar: require('./toolbar/toolbar'),
  ToolbarGroup: require('./toolbar/toolbar-group'),
  ToolbarSeparator: require('./toolbar/toolbar-separator'),
  ToolbarTitle: require('./toolbar/toolbar-title'),
  Tooltip: require('./tooltip'),
  Utils: {
    CssEvent: require('./utils/css-event'),
    Dom: require('./utils/dom'),
    Events: require('./utils/events'),
    KeyCode: require('./utils/key-code'),
    KeyLine: require('./utils/key-line'),
    ColorManipulator: require('./utils/color-manipulator'),
    Extend: require('./utils/extend'),
    UniqueId: require('./utils/unique-id')
  },
  ListItem: require('./list/list-item')
};
