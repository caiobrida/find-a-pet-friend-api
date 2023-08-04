export function customFilter<T>(
  array: T[],
  filters: Record<string, string>,
  page: number | string,
  itemsPerPage: number,
): T[] {
  const pageNumber: number = Number(page) || 1

  const filteredArray: T[] = array.filter((item) => {
    return Object.entries(filters).every(([column, value]) => {
      if (typeof value === 'string') {
        return String(item[column]).toLowerCase().includes(value.toLowerCase())
      }
      return item[column] === value
    })
  })

  const startIndex: number = (pageNumber - 1) * itemsPerPage
  const endIndex: number = startIndex + itemsPerPage

  const paginatedArray: T[] = filteredArray.slice(startIndex, endIndex)

  return paginatedArray
}
