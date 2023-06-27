type RecordItem = {
  //自定义数据类型 
  value: string;
  selectedtags: string[];
  form: string;
  amount: number;
  createdAt?: string;
  id?: string;
};
type Tag = {
  id: string
  name: string
};