class ImageManager {
    private cacheImages: Object;
    private static instance: ImageManager;
 
    private constructor() {
        this.cacheImages = {};
    }
 
    public static getInstance(): ImageManager {
        if (!ImageManager.instance) {
            ImageManager.instance = new ImageManager();
        }
        return ImageManager.instance;
    }
 
    public preloadImage(url, callback): void {
        if (this.cacheImages[url]) {
            callback(this.cacheImages[url]);
            return;
        }
        var image = new Image();
        image.src = url;
        image.onload = ()=>{
            this.cacheImages[url] = image;
            callback(image);
        }
    }
}
 
// 获取单例实例
export default ImageManager.getInstance();