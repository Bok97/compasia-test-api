import { ColorDto } from 'src/api/color/dto/color.dto';

export class ProductResponseDto {
  productId: number;
  name: string;
  price: number;
  brand: string;
  colors: ColorDto[];
}
