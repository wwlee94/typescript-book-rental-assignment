import { Get, JsonController } from 'routing-controllers';
import { BaseController } from './BaseController';

@JsonController('/books')
export class BookController extends BaseController {
  @Get()
  public index() {
    return 'Hello books';
  }
}
