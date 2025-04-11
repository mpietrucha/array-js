import { createArray } from '@/array'
import { createNone, notNone } from '@mpietrucha/is'
import { InteractsWithProtected } from '@mpietrucha/protected'
import { useNegate } from '@mpietrucha/value'

export class InteractsWithArray extends InteractsWithProtected {
    #items

    constructor(items = createNone()) {
        super('add', 'items', 'flush')

        this.flush()

        notNone(items) && this.add(items)
    }

    items() {
        return this.#items
    }

    supported(item) {
        return true
    }

    unsupported(item) {
        return useNegate(this.supported(item))
    }

    flush() {
        this.#items = []

        return this
    }

    add(items) {
        createArray(items)
            .filter(item => this.supported(item))
            .forEach(item => this.#items.push(item))

        return this
    }
}
