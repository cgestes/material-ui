var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var Paper = require('./paper');
var EnhancedSwitch = require('./enhanced-switch');

var Toggle = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    onToggle: React.PropTypes.func,
    toggled: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      switched: 
        this.props.toggled ||
        this.props.defaultToggled || 
        (this.props.valueLink && this.props.valueLink.value) || 
        false,
    }
  },

  render: function() {
    var {
      onToggle,
      ...other
    } = this.props;

    var toggleSize = 20;
    var toggleTrackWidth = 36;
    var iconStyles = {
        padding: '4px 0px 6px 2px'
    };
    var trackStyles = {
        transition: Transitions.easeOut(),
        width: toggleTrackWidth,
        height: 14,
        borderRadius: 30,
        opacity: this.state.switched ? 0.5 : 1,  
        backgroundColor: this.props.disabled ? CustomVariables.toggleTrackDisabledColor :
                         this.state.switched ? CustomVariables.toggleTrackOnColor : 
                         CustomVariables.toggleTrackOffColor
    };
    var thumbStyles = {
        transition: Transitions.easeOut(),
        position: 'absolute',
        top: 1,
        left: this.state.switched ? 18 : 2,
        width: toggleSize,
        height: toggleSize,
        lineHeight: '24px',
        borderRadius: '50%',
        backgroundColor: this.props.disabled ? CustomVariables.toggleThumbDisabledColor :
                         this.state.switched ? CustomVariables.toggleThumbOnColor : 
                         CustomVariables.toggleThumbOffColor
    };

    if (this.state.switched) {
      trackStyles.backgroundColor = CustomVariables.toggleTrackOnColor;
      thumbStyles.backgroundColor = CustomVariables.toggleTrackOnColor;
      thumbStyles.left = 18;
    }

    if (this.props.disabled) {
      trackStyles.backgroundColor = CustomVariables.toggleTrackDisabledColor;
      thumbStyles.backgroundColor = CustomVariables.toggleThumbDisabledColor;
    }

    var toggleElement = (
      <div>
        <div style={trackStyles} />
        <Paper style={thumbStyles} circle={true} zDepth={1} />
      </div>
    );

    var customRippleStyle = {
      top: '-10',
      left: '-10'
    };

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: toggleElement,
      className: "mui-toggle",
      rippleStyle: customRippleStyle,
      iconStyle: iconStyles,
      trackStyle: trackStyles,
      thumbStyle: thumbStyles,
      switched: this.state.switched,
      onSwitch: this._handleToggle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "left"
    };

    if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

    return (
      <EnhancedSwitch 
        {...other}
        {...enhancedSwitchProps}/>
    );
  },

  isToggled: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle: function(e, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  },

  _handleStateChange: function(newSwitched) {
    this.setState({switched: newSwitched});
  }

});

module.exports = Toggle;