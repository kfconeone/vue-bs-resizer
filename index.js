function getWidth() {
    if (this._currentBrowserWidth == "none") {
        let width = window.innerWidth > 0 ? window.innerWidth : screen.width;

        if (width < 576) {
            this._currentBrowserWidth = "xs";
        } else if (width >= 576 && width < 768) {
            this._currentBrowserWidth = "sm";
        } else if (width >= 768 && width < 992) {
            this._currentBrowserWidth = "md";
        } else if (width >= 992 && width < 1200) {
            this._currentBrowserWidth = "lg";
        } else if (width >= 1200 && width < 1400) {
            this._currentBrowserWidth = "xl";
        } else if (width >= 1400 && width < 1920) {
            this._currentBrowserWidth = "xxl";
        } else if (width >= 1920) {
            this._currentBrowserWidth = "xxxl";
        }
    }
    return this._currentBrowserWidth;
}

export default {
    install: (app) => {
        let resizer = {
            getWidth,
            _currentBrowserWidth: "none",
            onBreak: {},
        };
        app.config.globalProperties.$resizer = resizer;

        let originResize = window.onresize;
        window.onresize = () => {
            if (originResize) originResize();
            let originWidth = resizer._currentBrowserWidth;
            let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            if (width < 576 && resizer._currentBrowserWidth != "xs") {
                resizer._currentBrowserWidth = "xs";
            } else if (width >= 576 && width < 768 && resizer._currentBrowserWidth != "sm") {
                resizer._currentBrowserWidth = "sm";
            } else if (width >= 768 && width < 992 && resizer._currentBrowserWidth != "md") {
                resizer._currentBrowserWidth = "md";
            } else if (width >= 992 && width < 1200 && resizer._currentBrowserWidth != "lg") {
                resizer._currentBrowserWidth = "lg";
            } else if (width >= 1200 && width < 1400 && resizer._currentBrowserWidth != "xl") {
                resizer._currentBrowserWidth = "xl";
            } else if (width >= 1400 && width < 1920 && resizer._currentBrowserWidth != "xxl") {
                resizer._currentBrowserWidth = "xxl";
            } else if (width >= 1920 && resizer._currentBrowserWidth != "xxxl") {
                resizer._currentBrowserWidth = "xxxl";
            }

            if (originWidth != resizer._currentBrowserWidth) {
                Object.values(resizer.onBreak).forEach(async (f) => await f(resizer._currentBrowserWidth));
            }
        };
    },
};
