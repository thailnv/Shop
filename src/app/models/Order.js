const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Convert = require('../../util/mongoose');

const Ord = new Schema({
    customer_id: { type: String, required: true },
    customer_name:{type: String, required: true},
    totalprice: { type: Number, required: true },
    order_date : {type: Date, default: Date.now()},
    delivery_date : {type: Date, default: Date.now()},
    status : {type : String, default: 'Pending'}
},{
    versionKey : false,
});

const OrdDetail = new Schema({
    order_id : {type: String, required: true},
    product_id : {type: String, required: true},
    number : {type: Number, required: true}
},{
    versionKey : false,
}); 

const order = mongoose.model('order', Ord);

const orderdetail = mongoose.model('orderdetail', OrdDetail);

class Order {
    async create(data, result){
        let ord = new order({customer_id : data.customer_id,
                            customer_name: data.customer_name, 
                            totalprice : data.totalprice});
        await ord.save()
        .then((rod)=>{
            //console.log(rod);
            let orddetail;
            for(let i = 0 ; i < data.order.length; i++){
                orddetail = new orderdetail({order_id : rod._id, 
                                            product_id : data.order[i].id, 
                                            number : data.order[i].num });
                orddetail.save();
            }
            result.status = 'success';
            console.log(result.status);
        })
        .catch((error)=>{
            result.status = 'order fail';
            console.log(error);
            console.log(result.status);
        })
    }

    async findAll(data){
        let orderlist = {};
        await order.find({})
        .then((orders)=>{
            orders = Convert.cvDataToObjects(orders);
            for(let i = 0; i < orders.length ; i++){
                let order_detail = {};
                
            }
            data.orders = orders;
        })
        .catch(()=>{
            data.orders = [];
        })
    }

    async findByCustomerID(cus_id, data){
        let order_list = [];
        data.customer_id = cus_id;
        await order.find({customer_id : cus_id})
        .then(async (orders)=>{
            orders= Convert.cvDataToObjects(orders);
            for(let i = 0; i < orders.length; i++){
                let order_data_detail = {};
                order_data_detail.order_id = orders[i]._id;
                await orderdetail.find({order_id : orders[i]._id}).select('product_id number -_id')
                .then((orderdetails)=>{
                    orderdetails = Convert.cvDataToObjects(orderdetails);
                    order_data_detail.order_detail = orderdetails;
                    order_list.push(order_data_detail);
                })
                .catch((err)=>{
                    console.log(err);
                    order_data_detail = [];
                })
            }
        })
        .catch((err)=>{
            console.log(err);
            data.orders = [];
        })
        data.orders = order_list;
    }
}

module.exports = new Order;