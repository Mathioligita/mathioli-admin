
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { useUserContext } from '../context/usecontext'; // Adjust the path if necessary
import { Sidebar } from 'primereact/sidebar';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../dashboard/dashboard.scss"
import { ColorPicker } from 'primereact/colorpicker';

const AppConfig = () => {
  const { textColor, fontFamily, backgroundColor, setTextColor, setFontFamily, setBackgroundColor } = useUserContext();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [rippleEffect, setRippleEffect] = useState(true);

  const colors = ['#FF5733', '#ffffff', '#3357FF'];
  const fonts = ['Poppins', 'Outfit', 'Georgia'];
  const backgrounds = ['#121212', '#ffffff', '#e0e0e0'];

  useEffect(() => {
    // Load settings from local storage
    const storedTextColor = localStorage.getItem('textColor');
    const storedFontFamily = localStorage.getItem('fontFamily');
    const storedBackgroundColor = localStorage.getItem('backgroundColor');
    const storedRippleEffect = localStorage.getItem('rippleEffect');

    if (storedTextColor) setTextColor(storedTextColor);
    if (storedFontFamily) setFontFamily(storedFontFamily);
    if (storedBackgroundColor) {
      setBackgroundColor(storedBackgroundColor);
      // Update text color based on the loaded background color
      updateTextColorBasedOnBackground(storedBackgroundColor);
    }
    if (storedRippleEffect !== null) setRippleEffect(JSON.parse(storedRippleEffect));
  }, [setTextColor, setFontFamily, setBackgroundColor]);

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleRippleChange = (e) => {
    const value = e.value;
    setRippleEffect(value);
    localStorage.setItem('rippleEffect', value);
  };

  const updateBackgroundColor = (bg) => {
    setBackgroundColor(bg);
    localStorage.setItem('backgroundColor', bg);
    updateTextColorBasedOnBackground(bg);
  };

  const updateTextColorBasedOnBackground = (bg) => {
    const newTextColor = bg === '#121212' ? 'white' : 'black';
    setTextColor(newTextColor);
    localStorage.setItem('textColor', newTextColor);
  };

  const updateFontFamily = (font) => {
    setFontFamily(font);
    localStorage.setItem('fontFamily', font);
  };

  return (
    <div>
      <Button className="layout-config-button config-link" type="button" onClick={handleSidebarToggle}>
        <i className="pi pi-spin pi-cog"></i>
      </Button>
      <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} position="right" className="layout-config-sidebar w-20rem">
        
        <h5>Text Color</h5>
        <div>
          {colors.map((color, index) => (
            <Button
              key={index}
              style={{ margin: '5px', backgroundColor: color, color: '#fff' }}
              onClick={() => {
                setTextColor(color);
                localStorage.setItem('textColor', color);
              }}
              label={`Color ${index + 1}`}
            />
          ))}
        </div>

        <h5>Font Family</h5>
        <div>
          {fonts.map((font, index) => (
            <Button
              key={index}
              style={{ margin: '5px' }}
              onClick={() => updateFontFamily(font)}
              label={font}
            />
          ))}
        </div>

        <h5>Background Color</h5>
      
        <div>
          {backgrounds.map((bg, index) => (
            <>
            <Button
              key={index}
              style={{
                margin: '5px',
                backgroundColor: bg,
                color: bg === 'black' ? 'white' : 'black' 
              }}
              onClick={() => updateBackgroundColor(bg)}
              label={`BG ${index + 1}`}
            />
            </>
          ))}
        </div>

        <h5>Ripple Effect</h5>
        <InputSwitch checked={rippleEffect} onChange={handleRippleChange} />
      </Sidebar>
    </div>
  );
};

export default AppConfig;
