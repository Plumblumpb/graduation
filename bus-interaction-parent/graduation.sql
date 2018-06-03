/*
Navicat MySQL Data Transfer

Source Server         : graduation
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : graduationproject

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-08 21:39:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `carid` int(10) NOT NULL,
  `type` varchar(30) NOT NULL,
  `carnum` int(10) NOT NULL,
  `company_id` int(10) NOT NULL,
  PRIMARY KEY (`carid`),
  KEY `company_id` (`company_id`),
  KEY `type` (`type`),
  CONSTRAINT `company_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`comid`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of car
-- ----------------------------
INSERT INTO `car` VALUES ('1', '甲醇罐车', '500', '1');
INSERT INTO `car` VALUES ('2', '货卡', '500', '1');
INSERT INTO `car` VALUES ('3', '地层水罐车', '500', '1');
INSERT INTO `car` VALUES ('4', '吊车', '500', '1');
INSERT INTO `car` VALUES ('5', '炮车', '500', '1');
INSERT INTO `car` VALUES ('6', '甲醇罐车', '500', '2');
INSERT INTO `car` VALUES ('7', '货车', '500', '2');
INSERT INTO `car` VALUES ('8', '地层水罐车 ', '500', '2');
INSERT INTO `car` VALUES ('9', '吊车', '500', '2');
INSERT INTO `car` VALUES ('10', '炮车', '500', '2');
INSERT INTO `car` VALUES ('11', '甲醇罐车', '500', '3');
INSERT INTO `car` VALUES ('12', '货车', '500', '3');
INSERT INTO `car` VALUES ('13', '地层水罐车', '500', '3');
INSERT INTO `car` VALUES ('14', '吊车', '500', '3');
INSERT INTO `car` VALUES ('15', '炮车', '500', '3');

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `comid` int(10) NOT NULL,
  `comname` varchar(10) NOT NULL,
  PRIMARY KEY (`comid`),
  KEY `companyname` (`comname`),
  KEY `companyname_2` (`comname`,`comid`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES ('4', '采气一厂');
INSERT INTO `company` VALUES ('3', '锦林运输公司');
INSERT INTO `company` VALUES ('2', '靖边运输公司');
INSERT INTO `company` VALUES ('1', '庆丰运输公司');

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `noteid` int(10) NOT NULL AUTO_INCREMENT,
  `username_plan` varchar(30) DEFAULT NULL COMMENT '用车人员',
  `user_number` int(10) DEFAULT NULL COMMENT '用人编号',
  `car_type` varchar(10) DEFAULT NULL COMMENT '车辆类型',
  `car_number` int(10) DEFAULT NULL COMMENT '车辆数量',
  `origin` varchar(30) DEFAULT NULL COMMENT '出发地',
  `destination` varchar(30) DEFAULT NULL COMMENT '目的地',
  `company_id` int(10) DEFAULT NULL COMMENT '公司id',
  `status` varchar(30) DEFAULT NULL COMMENT '状态',
  `transport_plan` int(16) DEFAULT NULL,
  `transport_real` int(16) DEFAULT NULL,
  `beginTime` date DEFAULT NULL,
  `time_plan` int(16) DEFAULT NULL,
  `time_real` int(16) DEFAULT NULL,
  `username_real` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`noteid`),
  KEY `company` (`company_id`),
  CONSTRAINT `company` FOREIGN KEY (`company_id`) REFERENCES `company` (`comid`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of note
-- ----------------------------

-- ----------------------------
-- Table structure for note_car
-- ----------------------------
DROP TABLE IF EXISTS `note_car`;
CREATE TABLE `note_car` (
  `noteid` int(10) NOT NULL AUTO_INCREMENT,
  `username_plan` varchar(30) DEFAULT NULL COMMENT '用车人员',
  `car_id` varchar(10) DEFAULT NULL COMMENT '车辆类型',
  `car_number` int(10) DEFAULT NULL COMMENT '车辆数量',
  `origin_id` varchar(30) DEFAULT NULL COMMENT '出发地',
  `destination_id` varchar(30) DEFAULT NULL COMMENT '目的地',
  `status` varchar(30) DEFAULT NULL COMMENT '状态',
  `transport_plan` int(16) DEFAULT NULL,
  `transport_real` int(16) DEFAULT NULL,
  `beginTime` date DEFAULT NULL,
  `time_plan` date DEFAULT NULL,
  `time_real` date DEFAULT NULL,
  `username_real` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`noteid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of note_car
-- ----------------------------
INSERT INTO `note_car` VALUES ('1', '张晓明', '1', '2', '1', '2', null, '25', '25', '2014-06-19', '2014-06-10', '2014-06-22', '陈晓明');

-- ----------------------------
-- Table structure for place
-- ----------------------------
DROP TABLE IF EXISTS `place`;
CREATE TABLE `place` (
  `place_id` int(12) NOT NULL AUTO_INCREMENT,
  `place_name` varchar(32) NOT NULL,
  PRIMARY KEY (`place_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of place
-- ----------------------------
INSERT INTO `place` VALUES ('1', '靖边气田');
INSERT INTO `place` VALUES ('2', '苏东南气田');
INSERT INTO `place` VALUES ('3', '玉门气田');
INSERT INTO `place` VALUES ('4', '延长气田');
INSERT INTO `place` VALUES ('5', '四川气田');
INSERT INTO `place` VALUES ('6', '泸州气田');

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept` (
  `dept_id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `order_num` int(11) DEFAULT NULL,
  `del_flag` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES ('1', '0', '采气一厂', '0', '0');
INSERT INTO `sys_dept` VALUES ('2', '1', '用车单位', '1', '0');
INSERT INTO `sys_dept` VALUES ('4', '1', '作业区单位', '2', '2');
INSERT INTO `sys_dept` VALUES ('9', '1', '各单位领导部门', '2', '-1');
INSERT INTO `sys_dept` VALUES ('10', '1', '生产运营部门', '2', '0');
INSERT INTO `sys_dept` VALUES ('11', '0', '运输公司', '1', '0');
INSERT INTO `sys_dept` VALUES ('12', '11', '运输部门', '2', '0');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `perms` varchar(500) DEFAULT NULL,
  `type` smallint(6) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `order_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('1', '0', '系统管理', null, null, '0', 'fa fa-gear', '0');
INSERT INTO `sys_menu` VALUES ('2', '1', '管理员管理', 'modules/sys/user.html', null, '1', 'fa fa-user', '1');
INSERT INTO `sys_menu` VALUES ('3', '1', '角色管理', 'modules/sys/role.html', null, '1', 'fa fa-user-secret', '2');
INSERT INTO `sys_menu` VALUES ('4', '1', '菜单管理', 'modules/sys/menu.html', null, '1', 'fa fa-th-list', '3');
INSERT INTO `sys_menu` VALUES ('5', '1', '部门管理', 'modules/sys/dept.html', null, '1', 'fa fa-file-code-o', '4');
INSERT INTO `sys_menu` VALUES ('6', '1', 'SQL监控', 'druid/sql.html', null, '1', 'fa fa-bug', '5');
INSERT INTO `sys_menu` VALUES ('7', '2', '查看', null, 'sys:user:list,sys:user:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('8', '2', '新增', null, 'sys:user:save,sys:role:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('9', '2', '修改', null, 'sys:user:update,sys:role:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('10', '2', '删除', null, 'sys:user:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('11', '3', '查看', null, 'sys:role:list,sys:role:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('12', '3', '新增', null, 'sys:role:save,sys:menu:perms', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('13', '3', '修改', null, 'sys:role:update,sys:menu:perms', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('14', '3', '删除', null, 'sys:role:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('15', '4', '查看', null, 'sys:menu:list,sys:menu:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('16', '4', '新增', null, 'sys:menu:save,sys:menu:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('17', '1', '日志管理', 'modules/sys/log.html', 'sys:log:list', '1', 'fa fa-bug', '6');
INSERT INTO `sys_menu` VALUES ('18', '4', '修改', null, 'sys:menu:update,sys:menu:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('19', '4', '删除', null, 'sys:menu:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('20', '5', '查看', null, 'sys:dept:list,sys:dept:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('21', '5', '新增', null, 'sys:dept:save,sys:dept:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('22', '5', '修改', null, 'sys:dept:update,sys:dept:select', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('23', '5', '删除', null, 'sys:dept:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('40', '1', '配置管理', 'modules/sys/config.html', null, '1', 'fa fa-tags', '7');
INSERT INTO `sys_menu` VALUES ('41', '1', '版本管理', 'modules/sys/version.html', null, '1', 'fa fa-file', '8');
INSERT INTO `sys_menu` VALUES ('43', '40', '新增', null, 'sys:config:save', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('44', '40', '修改', null, 'sys:config:update', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('45', '40', '删除', null, 'sys:config:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('46', '41', '查看', null, 'sys:version:list,sys:version:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('47', '41', '新增', null, 'sys:version:save', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('48', '41', '删除', null, 'sys:version:delete', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('49', '41', '修改', null, 'sys:version:update', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('88', '40', '查看', null, 'sys:config:list,sys:config:info', '2', null, '0');
INSERT INTO `sys_menu` VALUES ('101', '0', '用车计划', null, null, '0', 'fa fa-address-card', '4');
INSERT INTO `sys_menu` VALUES ('102', '0', '合并车单', null, null, '0', 'fa fa-id-badge', '5');
INSERT INTO `sys_menu` VALUES ('103', '0', '审核车单', null, null, '0', 'fa fa-id-card', '6');
INSERT INTO `sys_menu` VALUES ('104', '0', '安排车辆', null, null, '0', 'fa fa-id-card', '6');
INSERT INTO `sys_menu` VALUES ('105', '0', '装卸车辆', null, null, '0', 'fa fa-window-restore', '7');
INSERT INTO `sys_menu` VALUES ('106', '101', '用车计划', 'modules/basic/carplan.html', null, '1', 'fa fa-asterisk', '1');
INSERT INTO `sys_menu` VALUES ('107', '102', '合并车辆', 'modules/basic/combinedlist.html', null, '1', '', '1');
INSERT INTO `sys_menu` VALUES ('108', '103', '审核车辆', 'modules/basic/auditlist.html', null, '1', '', '1');
INSERT INTO `sys_menu` VALUES ('109', '104', '安排车辆', 'modules/basic/arrangecar.html', null, '1', '', '1');
INSERT INTO `sys_menu` VALUES ('110', '105', '装卸车辆', 'modules/basic/loadcar.html', null, '1', '', '1');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `dept_id` int(11) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_dept`;
CREATE TABLE `sys_role_dept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `dept_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_dept
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salt` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `dept_id` int(11) DEFAULT NULL,
  `create_time` date DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', 'e1153123d7d180ceeb820d577ff119876678732a68eef4e6ffc0b1f06a01f91b', 'YzcmCZNvbXocrsz9dm8e', 'admin@gci.com', '13612345678', '1', '1', '2018-10-01');
INSERT INTO `sys_user` VALUES ('2', 'test', '0a6ce95a1faef66174b58c773d23dc9cba225d3ef9249d31dbbd498e04a2b301', 'cfy412obyXPHP2g0Irhg', '123@163.com', '123', '0', '2', '2018-03-22');
INSERT INTO `sys_user` VALUES ('3', 'test1', '73033d19be5d63145b607a1c2bb0c440a1a2644d01ab868644576b409e9d179f', 'Qe6rBr47BjjItgLjIypE', 'test@163.com', '123', '1', '2', '2018-03-22');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` int(10) NOT NULL AUTO_INCREMENT,
  `age` int(10) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `number` int(10) NOT NULL,
  `job` int(10) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '20', '1', '陈小王', '101', '10');
INSERT INTO `user` VALUES ('2', '22', '2', '小张', '102', '10');
INSERT INTO `user` VALUES ('3', '23', '1', '王五', '103', '10');
INSERT INTO `user` VALUES ('4', '24', '2', '李四', '104', '10');
INSERT INTO `user` VALUES ('5', '25', '1', '张三', '105', '10');
INSERT INTO `user` VALUES ('6', '28', '2', '张晓明', '106', '10');
INSERT INTO `user` VALUES ('7', '25', '1', '张晓敏', '107', '10');
INSERT INTO `user` VALUES ('8', '25', '2', '陈敬业', '108', '10');
INSERT INTO `user` VALUES ('9', '26', '1', '王幸福', '109', '10');
INSERT INTO `user` VALUES ('10', '24', '1', '小明', '110', '10');
INSERT INTO `user` VALUES ('11', '45', '2', '陈小春', '111', '20');
INSERT INTO `user` VALUES ('12', '48', '1', '张一山', '112', '20');
INSERT INTO `user` VALUES ('13', '51', '1', '毛不易', '113', '20');
INSERT INTO `user` VALUES ('14', '45', '2', '咪蒙', '114', '20');
INSERT INTO `user` VALUES ('15', '43', '1', '王尼玛', '115', '20');
INSERT INTO `user` VALUES ('16', '48', '2', '大队长', '116', '20');
INSERT INTO `user` VALUES ('17', '35', '2', '李易峰', '117', '30');
INSERT INTO `user` VALUES ('18', '34', '1', '王栎鑫', '118', '30');
INSERT INTO `user` VALUES ('19', '33', '1', '吴亦凡', '119', '30');
