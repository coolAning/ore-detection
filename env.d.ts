declare module "*.vue" {
    import { ComponentOptions } from "vue";

    const componentOptions: ComponentOptions;

    export default componentOptions;
}
declare module '*.svg' {
    const src: string
    export default src
}

// declare module '@/module/PlayerControl' {
//     export default class PlayerControl {
//         // 在这里添加PlayerControl类的方法和属性的声明
//         play(): void;
//         pause(): void;
//         // ...
//     }
// }