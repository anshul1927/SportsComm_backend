import {Restaurant, Customer, Order} from '../models/model';
import pubsub from '../pubsub'

const resolvers = {
    Query: {
        async restaurants (parent, args, context, info) {
            try {
                const restaurant = await Restaurant.find()
                return restaurant.map(r => ({ ...r._doc }))
            } catch (err) {
                console.error(err)
            }
        },
        async restaurant (parent, args, context, info) {
            try {
                const restaurant = await Restaurant.findOne({ _id: args.id })
                return { ...restaurant._doc }
            } catch (err) {
                console.error(err)
            }
        },
        async customers (parent, args, context, info) {
            try {
                const customer = await Customer.find()
                return customer.map(r => ({ ...customer._doc }))
            } catch (err) {
                console.error(err)
            }
        },
        async customer (parent, args, context, info) {
            try {
                const customer = await Customer.findOne({ _id: args.id })
                return { ...customer._doc }
            } catch (err) {
                console.error(err)
            }
        },
        async orders (parent, args, context, info) {
            try {
                const orderObj = await Order.find()
                return orderObj.map(o => ({ ...o._doc }))
            } catch (err) {
                console.error(err)
            }
        },
        async order (parent, args, context, info) {
            try {
                const orderObj = await Order.findOne({ _id: args.id })
                return { ...orderObj._doc }
            } catch (err) {
                console.error(err)
            }
        }
    },
    Mutation: {
        async addRestaurant (parent, args, context, info) {
            const { name, email, location, menu } = args
            const restaurantObj = new Restaurant({
                name,
                email,
                location,
                menu
            })
            try {
                const result = await restaurantObj.save()
                return { ...result._doc }
            } catch (err) {
                console.error(err)
            }
        },
        async addCustomer (parent, args, context, info) {
            const { name, email, location } = args
            const customerObj = new Customer({
                name,
                email,
                location
            })
            try {
                const result = await customerObj.save()
                return { ...result._doc }
            } catch (err) {
                console.error(err)
            }
        },
        async addOrder (parent, args, context, info) {
            const { customerId, restaurantId, order } = args
            const orderObj = new Order({
                customerId,
                restaurantId,
                order
            })
            try {
                const result = await orderObj.save()
                const order_1 = { ...result._doc }
                pubsub.publish('NEW_ORDER', { newOrder: order_1 })
                return order_1
            } catch (err) {
                console.error(err)
            }
        }
    },
    Subscription: {
        newOrder: {
            resolve: (payload) => {
                return payload.newOrder
            },
            subscribe: () => {
                return pubsub.asyncIterator('NEW_ORDER')
            }
        }
    }
}

export default resolvers