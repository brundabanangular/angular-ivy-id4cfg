import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "ConvertToSpace"
})
export class ConvertToSpacesPipe implements PipeTransform {
  transform(value: string, charecter: string): string {
    return value.replace(charecter, " ");
  }
}
