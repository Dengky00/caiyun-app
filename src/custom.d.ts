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