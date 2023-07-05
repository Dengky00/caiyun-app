type RecordItem = {
  //自定义数据类型 
  value: string;
  selectedtag: string;
  form: string;
  amount: number;
  createdAt?: string;
  id: string;
};
type Tag = {
  id: string
  name: string
  type: string
};