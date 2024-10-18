interface TransformArrayProps<T> {
  data: T[];
  keyField: keyof T;
  valueField: keyof T;
}

interface TransformedItem {
  key: any;
  value: any;
}

const TransformArray = <T>({ data, keyField, valueField }: TransformArrayProps<T>): TransformedItem[] => {
  return data?.map(item => ({
    key: item[keyField],
    value: item[valueField],
  }));
};

export default TransformArray;