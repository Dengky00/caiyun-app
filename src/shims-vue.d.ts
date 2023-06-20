declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
//svg模块声明
declare module "*.svg" {
  const content: string;
  export default content;
}
