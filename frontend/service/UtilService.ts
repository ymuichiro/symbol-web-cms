export default class UtilService {
  static formatDate(date: Date, type: 'yyyy/MM/dd' | 'yyyy-MM-dd'): string {
    if (type === 'yyyy-MM-dd') {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    } else if (type === 'yyyy/MM/dd') {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    } else {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
  }

  /**
   * @param path example /path/path
   */
  static switchUrl(path: string): string {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      if (path[0] === '/') {
        return `http://localhost:1337${path}`;
      } else {
        const u = new URL(path);
        return `http://localhost:1337${u.pathname}`;
      }
    } else {
      return path;
    }
  }
}
