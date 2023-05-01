const db = require('../../data/db-config');

/* 
select 
    *
from Employee as e
inner join [Order] as o
on o.EmployeeId = e.Id;


{
        "CustomerId": "VICTE",
        "EmployeeId": 3,
        "FirstName": "Janet",
        "Freight": 20.25,
        "Id": 10251,
        "OrderDate": "2012-07-08",
        "RequiredDate": "2012-08-05",
        "ShipAddress": "2, rue du Commerce",
        "ShipCity": "Lyon",
        "ShipCountry": "France",
        "ShipName": "Victuailles en stock",
        "ShipPostalCode": "69004",
        "ShipRegion": "Western Europe",
        "ShipVia": 1,
        "ShippedDate": "2012-07-15"
    },


    {
        "FirstName": "Janet",
        "Orders": [
                    {CustomerId": "VICTE",
                    "EmployeeId": 3,
                    "Freight": 20.25,
                    "Id": 10251,
                    "OrderDate": "2012-07-08",
                    "RequiredDate": "2012-08-05",
                    "ShipAddress": "2, rue du Commerce",
                    "ShipCity": "Lyon",
                    "ShipCountry": "France",
                    "ShipName": "Victuailles en stock",
                    "ShipPostalCode": "69004",
                    "ShipRegion": "Western Europe",
                    "ShipVia": 1,
                    "ShippedDate": "2012-07-15"
                    },
                    {
                    "CustomerId": "HANAR",
                    "EmployeeId": 3,
                    "Freight": 35.5,
                    "Id": 10253,
                    "OrderDate": "2012-07-10",
                    "RequiredDate": "2012-07-24",
                    "ShipAddress": "Rua do Paço, 67",
                    "ShipCity": "Rio de Janeiro",
                    "ShipCountry": "Brazil",
                    "ShipName": "Hanari Carnes",
                    "ShipPostalCode": "05454-876",
                    "ShipRegion": "South America",
                    "ShipVia": 2,
                    "ShippedDate": "2012-07-16"
                    }
                ],
    }
*/




async function getAll() {

    //per_page:100, page:2, offset: (page-1)*per_page+1
    const data = await db('Employee as e')
                .leftJoin('order as o', 'e.id', 'EmployeeId')
                .select('e.FirstName', 'o.*')
        
    //....

    const result =  data.reduce((acc,order)=> {

        recordedEmployee = acc.find(employee=>employee.Id == order.EmployeeId);

        if(recordedEmployee) {
        //case 2 kayıtlı kişi
            const newOrder = {
                    OrderDate: order.OrderDate,
                    OrderId: order.Id,
                    ShippedDate: order.ShippedDate
                }
            recordedEmployee.Orders.push(newOrder);

        } else {
        
        // case 3 yeni bir kişi ama order yok
            const newEmployee = {
                FirstName: order.FirstName,
                Id: order.EmployeeId,
                Orders: []
            }
            //case 1 yeni bir kişi ve order'ı var.
            if(order.Id) {
                newEmployee.Orders.push(
                    {
                        OrderDate: order.OrderDate,
                        OrderId: order.Id,
                        ShippedDate: order.ShippedDate
                    }
                )
            }

            acc.push(newEmployee);
        }
        return acc;
    }, []);

    return result;
}

function getById() {
    
}

function getByFilter() {
    
}


function create() {
    
}

function update() {
    
}

function remove() {
    
}

module.exports = {
    getAll,
    getById,
    getByFilter,
    create,
    update,
    remove,
}