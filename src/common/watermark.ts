/**
 * 水印设置
 * 
 */
export interface ContainerStyle {
  pointerEvents?: "none";
  top?: string;
  left?: string;
  position?: "absolute";
  zIndex?: string;
  width?: string;
  height?: string;
}

export interface Info {
  el?: Element | null;
  id: string;
  containerStyle: ContainerStyle;
  watermarkConfig?: WatermarkConfig | null;
}

/**
 * 接口获取的参数转换成水印设置的参数
 */
export interface WatermarkConfig {
  font?: string;
  fontColor?: string;
  alignment?: string;
  transparency?: number;
  spacing?: string;
  fontSize?: number;
  rotateDirection?: number;
  content?: string;
  rotateDegree?: number;
  mobile?: boolean;
}

function handleTextAlign(
  align: WatermarkConfig["alignment"],
  wText: number,
) {
  switch (align) {
    // 左对齐
    case "left":
      return {
        textAlign: "left",
        fillX: -wText / 2,
      };
    // 居中对齐
    case "center":
      return {
        textAlign: "center",
        fillX: 0,
      };
    // 右对齐
    case "right":
      return {
        textAlign: "right",
        fillX: wText / 2,
      };
    default:
      return {
        textAlign: "center",
        fillX: 0,
      };
  }
}

const DefaultId = "1.23452384164.123412415";

class Watermark {
  timer: number | undefined | NodeJS.Timeout;
  el: Info["el"];
  id: Info["id"] = "";
  containerStyle: Info["containerStyle"] = {};
  watermarkConfig: Info["watermarkConfig"] = {};

  static Name = "watermarkInfo";

  /**
   * 请求接口地址
   * @static
   */
  static readonly ConfigUrl = "/console/v2/watermark/getConfig";

  static readonly ServiceName = "console";

  static readonly SessionName = "global_";

  static WaterMarkSize = {
    large: 800,
    middle: 600,
    small: 400,
    mini: 200,
  };

  static MobileWaterMarkSize = {
    large: 400,
    middle: 300,
    small: 200,
    mini: 200,
  };

  static TextAlign = ["left", "center", "right"];

  static NoWaterMarkPath = ["/login", "/findPwd", "/changePwd"];

  /**
   * constructor方法，接收初始化参数
   * @param {*} info 同init方法
   * @function constructor
   */
  constructor(info?: Info) {
    this.timer = undefined;
    this.init(info);
  }

  /**
   * 初始化水印设置
   * @param {?object} config 水印初始化参数
   * @param {?HTMLElement} config.el 水印放置的元素，默认body
   * @param {?string} config.id 水印id
   * @param {?{pointerEvents,top,left,position,zIndex,width,height}} config.containerStyle 水印div的样式。
   * @param {?boolean} [config.iframeFlag=true]  是否启用iframe判断。启用后，如果子页面的水印不显示。默认启用
   * @param {?function} config.requestFn 自定义水印信息请求方法。
   * @param {?{date,time}} config.momentFormat 配置当前日期、当前时间格式，接受moment().format参数。
   * @param {?function} config.getLoginState 获取用户登录状态，返回boolean。不传则不判断是否登录，接口可能会报错
   * @param {?boolean} [config.isMobile=false]  移动端水印。默认否
   * @param {?boolean} [config.isPDF=false]  PDF导出。为true，不管水印配置开关是否打开，都会返回水印内容。默认否
   * @function init
   *
   * @example watermark.init()
   *
   * @example watermark.init({
     * requestFn: () =>
          DsUtils.post(
            Watermark.ConfigUrl,
            {},
            {
              headers: {
                ServiceName: Watermark.ServiceName
              }
            }
          )})
   */
  init(
    {
      el = null,
      id = DefaultId,
      containerStyle = {},
      watermarkConfig = {}
    }: Info = { id: DefaultId, containerStyle: {} },
  ) {
    this.el = el;
    this.id = id;
    this.containerStyle = containerStyle;
    this.watermarkConfig = watermarkConfig;
  }

  /**
   * 显示水印<br/>
   * 方法会先从SessionStorage中获取水印信息，如果没有数据，则调用requestFn方法获取水印信息
   * @function show
   */
  async show() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        if (this.id && document.getElementById(this.id) === null) {
          this.setWatermark();
        }
      }, 500);
    }
  }

  /**
   * 隐藏水印
   *
   * @function out
   */
  out() {
    clearInterval(this.timer);
    this.timer = undefined;
    if (this.id && document.getElementById(this.id) !== null) {
      const div = document.getElementById(this.id);
      div && (div.style.display = "none");
    }
  }

  /**
   * 删除水印（删除dom元素）
   *
   * @function remove
   */
  remove() {
    clearInterval(this.timer);
    this.timer = undefined;
    this.id && document.getElementById(this.id)?.remove();
  }

  setWatermark() {
    const { id, el, containerStyle, watermarkConfig } = this;
    document.getElementById(id)?.remove();

    const canvas = Watermark.createCanvas(watermarkConfig);

    const div = document.createElement("div");
    const {
      pointerEvents = "none",
      top = "0",
      left = "0",
      position = "absolute",
      zIndex = "100000",
      width = "100%",
      height = "100%",
    } = containerStyle;

    div.id = id;
    div.style.pointerEvents = pointerEvents;
    div.style.top = top;
    div.style.left = left;
    div.style.position = position;
    div.style.zIndex = zIndex;
    div.style.width = width;
    div.style.height = height;
    div.style.background =
      "url(" + canvas.toDataURL("image/png") + ") left top repeat";
    if (el) {
      el.appendChild(div);
    } else {
      document.body.appendChild(div);
    }
  }

  /**
   * 创建水印canvas，水印最终的样式由该方法生成<br/>
   * 静态方法，直接使用Watermark.createCanvas调用
   * @param {object} info
   * @param {number} info.width canvas宽度
   * @param {number} info.height canvas高度
   * @param {string} info.font 水印字体
   * @param {string} info.fontColor 水印字号
   * @param {"left"|"center"|"right"} info.alignment 对齐方式
   * @param {number} info.transparency 水印透明度
   * @param {string} info.content 水印内容
   * @param {number} info.fontSize 水印字号
   * @param {number} info.rotateDegree 水印旋转角度
   * @returns HTMLCanvasElement
   * @static
   * @function createCanvas
   */
  static createCanvas(info: WatermarkConfig | null | undefined): HTMLCanvasElement{
    const {
      font = "Microsoft YaHei, PingFangSC-Regular, sans-serif",
      fontColor = "rgb(203 213 225)",
      alignment = "center",
      transparency = 0.3,
      content = "progress123.online",
      fontSize = 24,
      rotateDegree = -30,
      spacing = "small",
      mobile = false
    } = info || {};

    const width = mobile
      ? Watermark.MobileWaterMarkSize[spacing]
      : Watermark.WaterMarkSize[spacing];
    const height = width;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const cans = canvas.getContext("2d");
    if (cans) {
      const texts = content.split("\n");
      const textLen = texts.length;
      const { width: wText } = cans.measureText(texts[0]);
      const { textAlign, fillX } = handleTextAlign(alignment, wText);
      cans.globalAlpha = transparency;
      cans.font = `${fontSize}px ${font}`; //字体
      cans.fillStyle = fontColor; //字体填充颜色
      cans.textAlign = textAlign as CanvasTextAlign; //对齐方式
      cans.textBaseline = "middle";
      cans.translate(width / 2, height / 2);
      cans.rotate((rotateDegree * Math.PI) / 180);
      // 被填充的文本
      texts.forEach((text, index) => {
        cans.fillText(
          text,
          fillX,
          fontSize * (index - textLen + Math.round(textLen / 2)),
        );
      });
    }

    return canvas;
  }

  /**
   * 当前配置的水印是否显示了。
   * @returns boolean
   * @function watermarkIsVisible
   */
  watermarkIsVisible() {
    const dom = document.getElementById(this.id);
    return dom ? dom.style.display !== "none" : false;
  }
}

const watermark = new Watermark();

export default watermark;

export { Watermark };
