var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var ClickAwayable = require('./mixins/click-awayable');
var DropDownArrow = require('./svg-icons/drop-down-arrow');
var KeyLine = require('./utils/key-line');
var Paper = require('./paper');
var Menu = require('./menu/menu');
var ClearFix = require('./clearfix');
var DropDownMenu = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  // The nested styles for drop-down-menu are modified by toolbar and possibly 
  // other user components, so it will give full access to its js styles rather 
  // than just the parent. 
  propTypes: {
    className: React.PropTypes.string,
    autoWidth: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    styleControl: React.PropTypes.object,
    styleControlBg: React.PropTypes.object,
    styleIcon: React.PropTypes.object,
    styleIconHover: React.PropTypes.object,
    styleLabel: React.PropTypes.object,
    styleUnderline: React.PropTypes.object,
    styleMenuItem: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      autoWidth: true
    };
  },

  getInitialState: function() {
    return {
      open: false,
      isHovered: false,
      selectedIndex: this.props.selectedIndex || 0
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  componentDidMount: function() {
    if (this.props.autoWidth) this._setWidth();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.hasOwnProperty('selectedIndex')) {
      this.setState({selectedIndex: nextProps.selectedIndex});
    }
  },

  /** Styles */
  _main: function() {
    var style = {
      transition: Transitions.easeOut(),
      position: 'relative',
      display: 'inline-block',
      height: CustomVariables.spacing.desktopToolbarHeight,
      fontSize: CustomVariables.spacing.desktopDropDownMenuFontSize
    };

    if (this.state.open) style.opacity = 1;

    return this.mergeAndPrefix(style);
  },

  _control: function() {
    var style = {
      cursor: 'pointer',
      position: 'static',
      height: '100%',
    };

    if (this.props.styleControl) this.mergeAndPrefix(style, this.props.styleControl);

    return style;
  },

  _controlBg: function() { 
    var style = {
      transition: Transitions.easeOut(),
      backgroundColor: CustomVariables.menuBackgroundColor,
      height: '100%',
      width: '100%',
      opacity: (this.state.open) ? 0 : 
               (this.state.isHovered) ? 1 : 0,
    };

    if (this.props.styleControlBg) style = this.mergeAndPrefix(style, this.props.styleControlBg);
  
    return style;
  },

  _icon: function() {
    var style = {
      position: 'absolute',
      top: ((CustomVariables.spacing.desktopToolbarHeight - 24) / 2),
      right: CustomVariables.spacing.desktopGutterLess,
      fill: CustomVariables.dropDownMenuIconColor,
    };

    if (this.props.styleIcon) style = this.mergeAndPrefix(style, this.props.styleIcon);
  
    return style;
  },

  _label: function() {
    var style = {
      transition: Transitions.easeOut(),
      lineHeight: CustomVariables.spacing.desktopToolbarHeight + 'px',
      position: 'absolute',
      paddingLeft: CustomVariables.spacing.desktopGutter,
      top: 0,
      opacity: 1,
    };

    if (this.state.open) {
      style = this.mergeAndPrefix(style, {
        opacity: 0,
        top: CustomVariables.spacing.desktopToolbarHeight / 2,
      });
    }

    if (this.props.styleLabel) style = this.mergeAndPrefix(style, this.props.styleLabel);
  
    return style;
  },

  _underline: function() {
    var style = {
      borderTop: 'solid 1px ' + CustomVariables.borderColor,
      margin: '0 ' + CustomVariables.spacing.desktopGutter + 'px',
    };

    if (this.props.styleUnderline) style =this.mergeAndPrefix(style, this.props.styleUnderline);
  
    return style;
  },

  _menuItem: function() {
    var style = {
      paddingRight: CustomVariables.spacing.iconSize + 
                    CustomVariables.spacing.desktopGutterLess + 
                    CustomVariables.spacing.desktopGutterMini,
      height: CustomVariables.spacing.desktopDropDownMenuItemHeight,
      lineHeight: CustomVariables.spacing.desktopDropDownMenuItemHeight + 'px',
      whiteSpace: 'nowrap',
    };

    if (this.props.styleMenuItem) style = this.mergeAndPrefix(style, this.props.styleMenuItem);
  
    return style;
  },


  render: function() {
    return (
      <div 
        style={this._main()} 
        className={this.props.className} 
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}>

          <ClearFix style={this._control()} onClick={this._onControlClick}>
            <Paper style={this._controlBg()} zDepth={0} />
            <div style={this._label()}>
              {this.props.menuItems[this.state.selectedIndex].text}
            </div>
            <DropDownArrow style={this._icon()} hoverStyle={this.props.styleIconHover}/>
            <div style={this._underline()}/>
          </ClearFix>

          <Menu
            ref="menuItems"
            autoWidth={this.props.autoWidth}
            selectedIndex={this.state.selectedIndex}
            menuItems={this.props.menuItems}
            menuItemStyle={this._menuItem()}
            hideable={true}
            visible={this.state.open}
            onItemClick={this._onMenuItemClick} />
      </div>
    );
  },

  _setWidth: function() {
    var el = this.getDOMNode(),
      menuItemsDom = this.refs.menuItems.getDOMNode();

    el.style.width = menuItemsDom.offsetWidth + 'px';
  },

  _onControlClick: function(e) {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.state.selectedIndex !== key) this.props.onChange(e, key, payload);
    this.setState({
      selectedIndex: key,
      open: false
    });
  },

  _handleMouseOver: function(e) {
    this.setState({isHovered: true});
  },

  _handleMouseOut: function(e) {
    this.setState({isHovered: false});
  }

});

module.exports = DropDownMenu;