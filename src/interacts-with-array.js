import { createArray } from '@/array'
import { InteractsWithProtected } from '@mpietrucha/protected'
import { negate } from '@mpietrucha/value'

export class InteractsWithArray extends InteractsWithProtected {
    #items = []

    constructor(items = []) {
        super('add', 'items')

        this.add(items)
    }

    items() {
        return this.#items
    }

    supported(item) {
        return true
    }

    unsupported(item) {
        return negate(this.supported(item))
    }

    add(items) {
        createArray(items)
            .filter(item => this.supported(item))
            .forEach(item => this.items().push(item))

        return this
    }
}
