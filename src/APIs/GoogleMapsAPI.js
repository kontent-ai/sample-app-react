let loadListeners = [];

class GoogleMapsAPI {
    constructor()
    {
        let script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAVOq4C-rf7JVeHt6ws9vsf-KHIRpueASg";
        script.async = true;
        this.onLoad = this.onLoad.bind(this);
        this.Get = this.Get.bind(this);
        this.addLoadListener = this.addLoadListener.bind(this);
        script.onload = this.onLoad;
        this.loaded = false;
        document.body.appendChild(script);
    }

    addLoadListener(listener)
    {
        loadListeners.push(listener);
    }

    onLoad()
    {
        this.loaded = true;
        loadListeners.forEach((listener) => {listener()});
    }

    Get()
    {
        return window.google;
    }
}

export default new GoogleMapsAPI();