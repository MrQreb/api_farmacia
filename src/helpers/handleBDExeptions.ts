import { Logger, BadRequestException, ConflictException } from '@nestjs/common';

export function handleDBExceptions(logger: Logger, error: any, entity: string): void {

    const uniqueConstraint = 'duplicate key value violates unique constraint';
    const isNotUniqueName = error.message.includes(uniqueConstraint);

    logger.error(`error_code: ${error.code} message:${error.message}`);
    logger.error(`entity:${entity}`);

    if (isNotUniqueName && entity === 'company') throw new ConflictException(`company already exists`);
    throw new BadRequestException('database error');
}