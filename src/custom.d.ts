type RecordItem = {
  //自定义数据类型
  type: string;
  selectedtags: string[];
  form: string;
  amount: number;
  createdAt?: Date;
};
type Tag = {
  id: string
  name: string
};
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  save: () => void
  create: (name: string) => 'success' | 'duplicated'//success表示成功,duplicated表示name重复
  update: (id: string, name: string) => 'success' | 'not find' | 'duplicated'
  remove: (id: string) => boolean
};
interface Window{
  tagList:Tag[]
}