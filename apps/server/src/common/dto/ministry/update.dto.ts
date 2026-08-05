import { InputType, PartialType } from "@nestjs/graphql";
import { CreateMinistryInput } from "./create.dto";

@InputType()
export class UpdateMinistryInput extends PartialType(CreateMinistryInput) {}
