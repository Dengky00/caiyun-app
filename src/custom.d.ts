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
  create: (name: string) => 'success' | 'duplicated'
  update: (id: string, name: string) => void
  remove: (id: string) => boolean
};