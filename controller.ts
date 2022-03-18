
//% weight=100 color=#00A654 icon="\uf11b" block="BBS Controller"
//% groups='["Inputs"]'
namespace BBS_Game_Controller {
	/**
	*Controller Standard Buttons
	*/
	export enum ControllerButtons {
	   
	    Fire1,
	    Fire2
	}


    export enum joystickType {
        //% block="X"
        X,
        //% block="Y"
        Y
    }
	
     
    /**
    *Controller Button Pins
    */
    export enum ControllerButtonPins {
        //% block="BTN A"
        Fire1 = DAL.MICROBIT_ID_IO_P12,
        //% block="BTN B"
        Fire2 = DAL.MICROBIT_ID_IO_P8
    }

    /**
    *Controller Button Events
    */
    export enum ControllerButtonEvents {
        //% block="down"
        Down = DAL.MICROBIT_BUTTON_EVT_DOWN,
        //% block="up"
        Up = DAL.MICROBIT_BUTTON_EVT_UP,
        //% block="click"
        Click = DAL.MICROBIT_BUTTON_EVT_CLICK
    }
    let initialized = false;
    
    function init(): void {
        if (initialized) return;
        
        pins.pushButton(DigitalPin.P12)
        pins.pushButton(DigitalPin.P8)
       
        initialized = true;
    }


    /**
    * get joystick value
    * @param joystickType describe parameter here, eg: 1
    */
    //% blockId=getRockerValue block="rocker value of %rocker"
    export function getRockerValue(joystick: joystickType): number {
        switch (joystick) {
            case joystickType.X: return pins.analogReadPin(AnalogPin.P1);
            case joystickType.Y: return pins.analogReadPin(AnalogPin.P0);
            default: return 0;
        }
    }
    

    /**
     * Determines if a Controller button is pressed
     * @param button press to be checked
     */
    //% group=Inputs
    //% blockId="bbs_controller_ispressed" block="button %button|is pressed"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    //% weight=95 blockGap=8
    export function buttonIsPressed(button: ControllerButtonPins): boolean {
        const pin = <DigitalPin><number>button;
        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == 0;
    }

    /**
     * Do something when one of the Controller Buttons is pressed
     * @param button press to be checked
     * @param event happening on the button, eg: click
     */
    //% group=Inputs
    //% blockId="bbs_controller_button_press_on_event" block="on button %button|press %event"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    //% weight=93 blockGap=8
    export function onButtonPress(button: ControllerButtonPins, event: ControllerButtonEvents, handler: Action) {
        init();
        control.onEvent(<number>button, <number>event, handler);
    }
	
    //% group=Inputs
    //% blockId="bbs_controller_button_press_off_event" block="on any button release"
    //% weight=93 blockGap=8
    export function onButtonRelease(handler: Action) {
        init();
        
        control.onEvent(ControllerButtonPins.Fire1, ControllerButtonEvents.Up, handler);
        control.onEvent(ControllerButtonPins.Fire2, ControllerButtonEvents.Up, handler);
    }
} 
