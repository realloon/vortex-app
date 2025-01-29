import mitt from 'mitt'

type Events = {
  route: string
}

const emitter = mitt<Events>()

export default emitter
