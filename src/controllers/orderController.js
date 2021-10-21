const mongoose = require('mongoose')

const userModel = require('../models/userModel')
const cartModel = require('../models/cartModel')
const orderModel = require('../models/orderModel')

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createOrder = async function (req, res) {
    try {
        const userId = req.params.userId
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid params received in request body' })
        }

        const { cartId, cancellable, status } = requestBody

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: `${userId} is not a valid user id` })
        }

        const user = await userModel.findOne({ _id: userId, isDeleted: false });

        if (!user) {
            return res.status(404).send({ status: false, message: `user does not exit` })
        }

        if (!isValidObjectId(cartId)) {
            return res.status(400).send({ status: false, message: `${cartId} is not a valid cart id` })
        }

        const cart = await cartModel.findOne({ _id: cartId, isDeleted: false });

        if (!cart) {
            return res.status(404).send({ status: false, message: `cart does not exit` })
        }

        if (cancellable) {
            if (!(typeof (cancellable) == 'boolean')) {
                return res.status(404).send({ status: false, message: `Cancellable should be a boolean value` })
            }
        }

        if (status) {
            if ((["pending", "completed", "cancled"].indexOf(status) === -1)) {
                return res.status(400).send({ status: false, message: `Status should be among ${["pending", "completed", "cancled"].join(', ')}` })
            }
        }

        if (!(cart.items.length)) {
            return res.status(202).send({ status: true, message: `order has been accepted` })
        }

        let totalQuantity = 0;
        for (let i = 0; i < cart.items.length; i++) {
            totalQuantity = totalQuantity + cart.items[i].quantity
        }

        const addToOrder = {
            userId: userId,
            items: cart.items,
            totalPrice: cart.totalPrice,
            totalItems: cart.totalItems,
            totalQuantity: totalQuantity,
            cancellable,
            status
        }

        const order = await orderModel.create(addToOrder)


        const updatedCartData = {}

        if (!Object.prototype.hasOwnProperty.call(updatedCartData, '$set'))
            updatedCartData['$set'] = {}

        updatedCartData['$set']['items'] = []


        if (!Object.prototype.hasOwnProperty.call(updatedCartData, '$set'))
            updatedCartData['$set'] = {}

        updatedCartData['$set']['totalPrice'] = 0



        if (!Object.prototype.hasOwnProperty.call(updatedCartData, '$set'))
            updatedCartData['$set'] = {}

        updatedCartData['$set']['totalItems'] = 0


        await cartModel.findOneAndUpdate({ userId: userId }, updatedCartData, {new: true})

        res.status(201).send({ status: true, message: "success", data: order })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, data: error.message });
    }
}

const updateOrder = async function (req, res) {
    try {
        const userId = req.params.userId
        const requestBody = req.body;

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: `${userId} is not a valid user id` })
        }

        const user = await userModel.findOne({ _id: userId, isDeleted: false });

        if (!user) {
            return res.status(404).send({ status: false, message: `user does not exit` })
        }

        const {status, orderId} = requestBody;

        if (!(isValidRequestBody(requestBody))) {
            return res.status(400).send({ status: false, message: 'No paramateres passed. order unmodified'})
        }

        if (!isValidObjectId(orderId)) {
            return res.status(400).send({ status: false, message: `${orderId} is not a valid order id` })
        }

        const order = await orderModel.findOne({ _id: orderId});

        if (!order) {
            return res.status(404).send({ status: false, message: `order does not exit` })
        }


        if (order.cancellable == true) {
            
            if (status) {
                if ((["pending", "completed", "cancled"].indexOf(status) === -1)) {
                    return res.status(400).send({ status: false, message: `Status should be among ${["pending", "completed", "cancled"].join(', ')}` })
                }
            }

           const updatedOrder = await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: status } }, {new: true})

           return res.status(200).send({ status: true, message: `Success`, data: updatedOrder})
        }
        

        if (status) {
            if ((["pending", "completed"].indexOf(status) === -1)) {
                return res.status(400).send({ status: false, message: `Status should be among ${["pending", "completed"].join(', ')}` })
            }
        }

       const updatedOrder = await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: status } }, {new: true})

       return res.status(200).send({ status: true, message: `Success`, data: updatedOrder})

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, data: error });
    }
}

module.exports.createOrder = createOrder
module.exports.updateOrder = updateOrder