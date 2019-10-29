import * as t from 'io-ts'

export const optional = <T extends t.Any>(
    type: T,
    name = `${type.name} | undefined`
): t.UnionType<
    [T, t.UndefinedType],
    t.TypeOf<T> | undefined,
    t.OutputOf<T> | undefined,
    t.InputOf<T> | undefined
> => t.union<[T, t.UndefinedType]>([type, t.undefined], name)

