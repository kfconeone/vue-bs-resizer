export default {
    install: (app) => {
        let resizer = {
            currentBrowserWidth: "none",
            onBreak: {},
        };
        app.config.globalProperties.$resizer = resizer;

        window.onload = () => {
            let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            if (width < 576) {
                resizer.currentBrowserWidth = "xs";
            } else if (width >= 576 && width < 768) {
                resizer.currentBrowserWidth = "sm";
            } else if (width >= 768 && width < 992) {
                resizer.currentBrowserWidth = "md";
            } else if (width >= 992 && width < 1200) {
                resizer.currentBrowserWidth = "lg";
            } else if (width >= 1200 && width < 1400) {
                resizer.currentBrowserWidth = "xl";
            } else if (width >= 1400 && width < 1920) {
                resizer.currentBrowserWidth = "xxl";
            } else if (width >= 1920) {
                resizer.currentBrowserWidth = "xxxl";
            }

            /*
            onbreak:{
                section1: () => {},
                section2: () => {}
            }
        
        */
        };

        let originResize = window.onresize;

        window.onresize = () => {
            if (originResize) originResize();
            let originWidth = resizer.currentBrowserWidth;
            let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            if (width < 576 && resizer.currentBrowserWidth != "xs") {
                resizer.currentBrowserWidth = "xs";
            } else if (width >= 576 && width < 768 && resizer.currentBrowserWidth != "sm") {
                resizer.currentBrowserWidth = "sm";
            } else if (width >= 768 && width < 992 && resizer.currentBrowserWidth != "md") {
                resizer.currentBrowserWidth = "md";
            } else if (width >= 992 && width < 1200 && resizer.currentBrowserWidth != "lg") {
                resizer.currentBrowserWidth = "lg";
            } else if (width >= 1200 && width < 1400 && resizer.currentBrowserWidth != "xl") {
                resizer.currentBrowserWidth = "xl";
            } else if (width >= 1400 && width < 1920 && resizer.currentBrowserWidth != "xxl") {
                resizer.currentBrowserWidth = "xxl";
            } else if (width >= 1920 && resizer.currentBrowserWidth != "xxxl") {
                resizer.currentBrowserWidth = "xxxl";
            }

            if (originWidth != resizer.currentBrowserWidth) {
                Object.values(resizer.onBreak).forEach((f) => f(resizer.currentBrowserWidth));
            }
        };
    },
};
