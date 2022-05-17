export class PageInfo<T> {
  pageInfo: Page;
  data: T[];

  static pageLis<T>(
    pageNumber: number,
    pageSize: number,
    result: [T[], number]
  ): PageInfo<T> {
    const info = new PageInfo<T>();
    info.pageInfo = Page.info(pageNumber, pageSize, result[1]);
    info.data = result[0];
    return info;
  }
}

class Page {
  pageNumber: number;
  pageSize: number;
  total: number;

  static info(pageNumber: number, pageSize: number, total: number): Page {
    const info = new Page();
    info.pageNumber = pageNumber;
    info.pageSize = pageSize;
    info.total = total;
    return info;
  }
}
