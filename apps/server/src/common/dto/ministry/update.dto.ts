import { InputType, PartialType } from "@nestjs/graphql";
import { CreateMinistryInput } from "./create.dto.js";

@InputType()
export class UpdateMinistryInput extends PartialType(CreateMinistryInput) {}
