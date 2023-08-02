interface DataItem {
  [key: string]: any
}

export function customFilter<T extends DataItem>(
  filters: DataItem,
  dataArray: T[],
): T[] {
  return dataArray.filter((item) => {
    return Object.keys(filters).every((key) => {
      return filters[key] === item[key]
    })
  })
}
