import Request from './request';
class RequestApi{
    req: Request;

    constructor() {
        this.req = new Request()
    }

      requestArticleList = async (pageNum: number,data?:object) => {
          let res = await this.req.post('/default/getArticleList', { pageNum, ...data })
        //   console.log(res);
          return res
    }


}

export default RequestApi