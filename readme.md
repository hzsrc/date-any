# date-any
支持任意格式组合的日期格式化、逆转、校验，日期格式标准参考C#。  
支持的格式化标记：yyyy、yy、MM、M、dd、d、HH、H、mm、ss。  

# 将日期格式化为字符串 -- Format Date to String
var date = new Date(2020, 11, 31, 13, 56, 57)  
var date1 = new Date(2020, 1, 3, 3, 4, 5)  

new DateAny('yyyy-MM-dd HH:mm:ss').format(date);   
` = '2020-12-31 13:56:57'`  
  
new DateAny('yyyy-M-d H:mm:ss').format(date1);   
` = '2020-2-3 3:04:05'`  
  
new DateAny('dd/M/yyyy H:mm:ss').format(date1);   
` = '03/2/2020 3:04:05'`  
  
new DateAny('yy年的M月dd日 H点mm分').format(date1);   
` = '20年的2月03日 3点04分'`  
  
new DateAny().format(date);   
` = '2020-12-31'`  
  

# 字符串按指定格式转为日期 -- Parse String to Date
new DateAny().toDate('2020-12-31');   
` = (Date) 2020-12-31 00:00:00`  
  
new DateAny('yyyy-MM-dd HH:mm:ss').toDate('2020-12-31 13:56:57');   
` = (Date) 2020-12-31 13:56:57`  
  
new DateAny('yyyy-M-d H:mm:ss').toDate('2020-2-3 3:04:05');   
` = (Date) 2020-02-03 03:04:05`  
  
new DateAny('dd/M/yyyy H:mm:ss').toDate('03/2/2020 3:04:05');   
` = (Date) 2020-02-03 03:04:05`  
  
new DateAny('yy年的M月dd日 H点mm分').toDate('20年的2月03日 3点04分');   
` = (Date) 2020-02-03 03:04:00`  
  
new DateAny('yyyy').toDate('2020');   
` = (Date) 2020-01-01 00:00:00`  
  

# 校验字符串是否符合指定的输入格式 -- check whether String is matching the format or not.

new DateAny('yyyy-MM-dd HH:mm:ss').check('2020-12-31 13:56:57');   
` = true`  
  
new DateAny('yyyy-M-d H:mm:ss').check('2020-2-3 3:04:05');   
` = true`  
  
new DateAny('dd/M/yyyy H:mm:ss').check('03/2/2020 3:04:05');   
` = true`  
  
new DateAny('yy年的M月dd日 H点mm分').check('20年的2月03日 3点04分');   
` = true`  
  

