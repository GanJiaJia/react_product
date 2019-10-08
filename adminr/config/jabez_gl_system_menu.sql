--  新系统权限树 author: jabez
insert into gl_system_menu values(50, '财务系统', '/finance', 'money', '', 0, 1, 0, 'admin', now());
insert into gl_system_menu values(51, '风控系统', '/risk', 'bug', '', 0, 2, 0, 'admin', now());
insert into gl_system_menu values(52, '运营系统', '/operational', '', '', 0, 3, 0, 'admin', now());
insert into gl_system_menu values(53, '用户管理系统', '/manage', '', '', 0, 4, 0, 'admin', now());

insert into gl_system_menu values(5000, '提现管理', '/finance/withdraw', '', '', 0, 1, 50, 'admin', now());
insert into gl_system_menu values(5001, '充值管理', '/finance/recharge', '', '', 0, 2, 50, 'admin', now());
insert into gl_system_menu values(5002, '资金管理', '/finance/fund', '', '', 0, 3, 50, 'admin', now());
insert into gl_system_menu values(5003, '资金调整', '/finance/adjust', '', '', 0, 4, 50, 'admin', now());
insert into gl_system_menu values(5004, '财务报表', '/finance/report', '', '', 0, 5, 50, 'admin', now());

insert into gl_system_menu values(500000, '提现出款', '/finance/withdraw/payment', '', '', 0, 1, 5000, 'admin', now());
insert into gl_system_menu values(500001, '提现审核', '/finance/withdraw/examine', '', '', 0, 2, 5000, 'admin', now());
insert into gl_system_menu values(500002, '提现分单', '/finance/withdraw/seperate', '', '', 0, 3, 5000, 'admin', now());
insert into gl_system_menu values(500003, '提现订单记录', '/finance/withdraw/history', '', '', 0, 4, 5000, 'admin', now());
insert into gl_system_menu values(500004, '提现相关设置', '/finance/withdraw/setting', '', '', 0, 5, 5000, 'admin', now());
insert into gl_system_menu values(500005, '提现分单设置', '/finance/withdraw/orserSetting', '', '', 0, 6, 5000, 'admin', now());
insert into gl_system_menu values(500006, '三方商户设置', '/finance/withdraw/third', '', '', 0, 7, 5000, 'admin', now());

insert into gl_system_menu values(500100, '充值补单', '/finance/recharge/repair', '', '', 0, 0, 5001, 'admin', now());
insert into gl_system_menu values(500101, '充值审核', '/finance/recharge/review', '', '', 0, 1, 5001, 'admin', now());
insert into gl_system_menu values(500102, '订单记录', '/finance/recharge/logs', '', '', 0, 2, 5001, 'admin', now());
insert into gl_system_menu values(500103, '充值金额设置', '/finance/recharge/amount', '', '', 0, 3, 5001, 'admin', now());
insert into gl_system_menu values(500104, '三方商户设置', '/finance/recharge/merchant-set', '', '', 0, 4, 5001, 'admin', now());
insert into gl_system_menu values(500105, '三方商户应用', '/finance/recharge/merchant-application', '', '', 0, 5, 5001, 'admin', now());
insert into gl_system_menu values(500106, '三方商户成功率', '/finance/recharge/merchant-rate', '', '', 0, 6, 5001, 'admin', now());

insert into gl_system_menu values(500200, '充值资金管理', '/finance/fund/recharge', '', '', 0, 0, 5002, 'admin', now());
insert into gl_system_menu values(500201, '提现资金管理', '/finance/fund/withdraw', '', '', 0, 1, 5002, 'admin', now());
insert into gl_system_menu values(500202, '资管资金管理', '/finance/fund/information', '', '', 0, 2, 5002, 'admin', now());
insert into gl_system_menu values(500203, '资管预警设置', '/finance/fund/warn', '', '', 0, 3, 5002, 'admin', now());

insert into gl_system_menu values(500300, '资金调整', '/finance/adjust/Adjustment', '', '', 0, 0, 5003, 'admin', now());

insert into gl_system_menu values(500400, '充值对账报表', '/finance/report/recharge', '', '', 0, 0, 5004, 'admin', now());
insert into gl_system_menu values(500401, '提现对账报表', '/finance/report/withdraw', '', '', 0, 1, 5004, 'admin', now());
insert into gl_system_menu values(500401, '交易明细报表', '/finance/report/transaction', '', '', 0, 1, 5004, 'admin', now());



-- 提现出款
insert into gl_system_menu values(50000000, '出款', 'new-finance-withdraw-transfer-do', '', '', 1, 0, 500000, 'admin', now());
-- 提现审核
insert into gl_system_menu values(50000100, '审核', 'new-finance-withdraw-approval-do', '', '', 1, 0, 500001, 'admin', now());
-- 提现分单
insert into gl_system_menu values(50000200, '分单', 'new-finance-withdraw-separate-do', '', '', 1, 0, 500002, 'admin', now());
insert into gl_system_menu values(50000201, '回单', 'new-finance-withdraw-separate-recovery', '', '', 1, 1, 500002, 'admin', now());
insert into gl_system_menu values(50000202, '批量分单', 'new-finance-withdraw-separate-do-batch', '', '', 1, 2, 500002, 'admin', now());
insert into gl_system_menu values(50000203, '批量回单', 'new-finance-withdraw-separate-recovery-batch', '', '', 1, 3, 500002, 'admin', now());
insert into gl_system_menu values(50000204, '退回余额', 'new-finance-withdraw-separate-back-balance', '', '', 1, 4, 500002, 'admin', now());
insert into gl_system_menu values(50000205, '验证订单状态', 'new-finance-withdraw-verify-order-status', '', '', 1, 5, 500002, 'admin', now());
insert into gl_system_menu values(50000206, '强制成功', 'new-finance-withdraw-separate-force-success', '', '', 1, 6, 500002, 'admin', now());
-- 提现订单记录
insert into gl_system_menu values(50000300, '强制成功', 'new-finance-withdraw-history-record-force-success', '', '', 1, 0, 500003, 'admin', now());
insert into gl_system_menu values(50000301, '退回余额', 'new-finance-withdraw-history-record-back-balance', '', '', 1, 1, 500003, 'admin', now());
insert into gl_system_menu values(50000302, '验证订单状态', 'new-finance-withdraw-history-record-verify-order-status', '', '', 1, 2, 500003, 'admin', now());
-- 提现相关设置(普通提现设置)
insert into gl_system_menu values(50000400, '编辑', 'new-finance-withdraw-setting-edit', '', '', 1, 0, 500004, 'admin', now());
-- 提现相关设置(大额提现设置)
insert into gl_system_menu values(50000401, '编辑', 'new-finance-withdraw-large-setting-edit', '', '', 1, 1, 500004, 'admin', now());
-- 提现相关设置(代理提现设置)
insert into gl_system_menu values(50000402, '编辑', 'new-finance-withdraw-proxy-setting-edit', '', '', 1, 2, 500004, 'admin', now());
-- 提现相关设置(提现通用设置)
insert into gl_system_menu values(50000403, '编辑', 'new-finance-withdraw-general-setting-edit', '', '', 1, 3, 500004, 'admin', now());
-- 提现分单设置(分单设置)
insert into gl_system_menu values(50000500, '编辑', 'new-finance-withdraw-separate-setting-edit', '', '', 1, 0, 500005, 'admin', now());
insert into gl_system_menu values(50000501, '添加', 'new-finance-withdraw-separate-setting-add', '', '', 1, 1, 500005, 'admin', now());
insert into gl_system_menu values(50000502, '删除', 'new-finance-withdraw-separate-setting-delete', '', '', 1, 2, 500005, 'admin', now());
insert into gl_system_menu values(50000503, '修改', 'new-finance-withdraw-separate-setting-update', '', '', 1, 3, 500005, 'admin', now());
-- 提现分单设置(分单账户设置)
insert into gl_system_menu values(50000504, '添加分单账户', 'new-finance-withdraw-separate-account-setting-add-account', '', '', 1, 4, 500005, 'admin', now());
insert into gl_system_menu values(50000505, '批量开启', 'new-finance-withdraw-separate-account-setting-batch-open', '', '', 1, 5, 500005, 'admin', now());
insert into gl_system_menu values(50000506, '批量关闭', 'new-finance-withdraw-separate-account-setting-batch-close', '', '', 1, 6, 500005, 'admin', now());
insert into gl_system_menu values(50000507, '批量删除', 'new-finance-withdraw-separate-account-setting-batch-delete', '', '', 1, 7, 500005, 'admin', now());
insert into gl_system_menu values(50000508, '设置', 'new-finance-withdraw-separate-account-setting-set', '', '', 1, 8, 500005, 'admin', now());
insert into gl_system_menu values(50000509, '开启', 'new-finance-withdraw-separate-account-setting-open', '', '', 1, 9, 500005, 'admin', now());
insert into gl_system_menu values(50000510, '关闭', 'new-finance-withdraw-separate-account-setting-close', '', '', 1, 10, 500005, 'admin', now());
insert into gl_system_menu values(50000511, '删除', 'new-finance-withdraw-separate-account-setting-delete', '', '', 1, 11, 500005, 'admin', now());
insert into gl_system_menu values(50000512, '修改', 'new-finance-withdraw-separate-account-setting-update', '', '', 1, 12, 500005, 'admin', now());
-- 提现分单设置(自动提现设置)
insert into gl_system_menu values(50000513, '添加', 'new-finance-withdraw-separate-automatic-setting-add', '', '', 1, 13, 500005, 'admin', now());
insert into gl_system_menu values(50000514, '删除', 'new-finance-withdraw-separate-automatic-setting-delete', '', '', 1, 14, 500005, 'admin', now());
insert into gl_system_menu values(50000515, '修改', 'new-finance-withdraw-separate-automatic-setting-update', '', '', 1, 15, 500005, 'admin', now());

-- 提现三方商户设置
insert into gl_system_menu values(50000600, '新增三方平台', 'new-finance-withdraw-merchant-setting', '', '', 1, 0, 500006, 'admin', now());
insert into gl_system_menu values(50000601, '批量开户商户', 'new-finance-withdraw-merchant-setting-batch-enable', '', '', 1, 1, 500006, 'admin', now());
insert into gl_system_menu values(50000602, '批量关闭商户', 'new-finance-withdraw-merchant-setting-batch-disable', '', '', 1, 2, 500006, 'admin', now());
insert into gl_system_menu values(50000603, '上架', 'new-finance-withdraw-merchant-setting-up', '', '', 1, 3, 500006, 'admin', now());
insert into gl_system_menu values(50000604, '下架', 'new-finance-withdraw-merchant-setting-down', '', '', 1, 4, 500006, 'admin', now());
insert into gl_system_menu values(50000605, '编辑', 'new-finance-withdraw-merchant-setting-edit', '', '', 1, 5, 500006, 'admin', now());
insert into gl_system_menu values(50000606, '删除', 'new-finance-withdraw-merchant-setting-delete', '', '', 1, 6, 500006, 'admin', now());
insert into gl_system_menu values(50000607, '开启', 'new-finance-withdraw-merchant-setting-enable', '', '', 1, 7, 500006, 'admin', now());
insert into gl_system_menu values(50000608, '关闭', 'new-finance-withdraw-merchant-setting-disable', '', '', 1, 8, 500006, 'admin', now());
-- 充值补单
insert into gl_system_menu values(50010000, '创建订单', 'new-finance-recharge-repair-create', '', '', 1, 0, 500100, 'admin', now());
insert into gl_system_menu values(50010001, '补单', 'new-finance-recharge-repair-replacement', '', '', 1, 1, 500100, 'admin', now());
-- 充值审核
insert into gl_system_menu values(50010100, '审核', 'new-finance-recharge-repair-audit-do', '', '', 1, 0, 500101, 'admin', now());
-- 充值金额设置(普通充值设置)
insert into gl_system_menu values(50010300, '编辑', 'new-finance-recharge-amount-set-edit', '', '', 1, 0, 500103, 'admin', now());
insert into gl_system_menu values(50010301, '充值配置', 'new-finance-recharge-amount-set-recharge-set', '', '', 1, 1, 500103, 'admin', now());
insert into gl_system_menu values(50010302, '银行卡限额', 'new-finance-recharge-amount-set-bank-limit', '', '', 1, 2, 500103, 'admin', now());
-- 充值金额设置(大额充值设置)
insert into gl_system_menu values(50010303, '编辑', 'new-finance-recharge-amount-large-set-edit', '', '', 1, 3, 500103, 'admin', now());
insert into gl_system_menu values(50010304, '编辑', 'new-finance-recharge-amount-large-set-recharge-set', '', '', 1, 4, 500103, 'admin', now());
insert into gl_system_menu values(50010305, '编辑', 'new-finance-recharge-amount-large-set-bank-set', '', '', 1, 5, 500103, 'admin', now());
-- 充值三方商户商户设置
insert into gl_system_menu values(50010400, '新增三方平台', 'new-finance-recharge-merchant-set-create', '', '', 1,0, 500104, 'admin', now());
insert into gl_system_menu values(50010401, '批量开启商户', 'new-finance-recharge-merchant-set-batch-enable', '', '', 1,1, 500104, 'admin', now());
insert into gl_system_menu values(50010402, '批量关闭商户', 'new-finance-recharge-merchant-set-batch-disable', '', '', 1,2, 500104, 'admin', now());
insert into gl_system_menu values(50010404, '开启', 'new-finance-recharge-merchant-set-enable', '', '', 1,3, 500104, 'admin', now());
insert into gl_system_menu values(50010403, '关闭', 'new-finance-recharge-merchant-set-disable', '', '', 1,4, 500104, 'admin', now());
insert into gl_system_menu values(50010405, '编辑', 'new-finance-recharge-merchant-set-edit', '', '', 1,5, 500104, 'admin', now());
-- 三方商户应用
insert into gl_system_menu values(50010500, '新增三方平台应用', 'new-finance-recharge-merchant-apply-create', '', '', 1, 0, 500105, 'admin', now());
insert into gl_system_menu values(50010501, '批量开启商户', 'new-finance-recharge-merchant-apply-batch-enable', '', '', 1, 1, 500105, 'admin', now());
insert into gl_system_menu values(50010502, '批量关闭商户', 'new-finance-recharge-merchant-apply-batch-disable', '', '', 1, 2, 500105, 'admin', now());
insert into gl_system_menu values(50010503, '上架', 'new-finance-recharge-merchant-apply-up', '', '', 1, 3, 500105, 'admin', now());
insert into gl_system_menu values(50010504, '下架', 'new-finance-recharge-merchant-apply-down', '', '', 1, 4, 500105, 'admin', now());
insert into gl_system_menu values(50010505, '编辑', 'new-finance-recharge-merchant-apply-edit', '', '', 1, 5, 500105, 'admin', now());
insert into gl_system_menu values(50010506, '删除', 'new-finance-recharge-merchant-apply-delete', '', '', 1, 6, 500105, 'admin', now());
insert into gl_system_menu values(50010507, '开启', 'new-finance-recharge-merchant-apply-enable', '', '', 1, 7, 500105, 'admin', now());
insert into gl_system_menu values(50010508, '关闭', 'new-finance-recharge-merchant-apply-disable', '', '', 1, 8, 500105, 'admin', now());
insert into gl_system_menu values(50010509, '置顶', 'new-finance-recharge-merchant-apply-topping', '', '', 1, 9, 500105, 'admin', now());
insert into gl_system_menu values(50010510, '推荐', 'new-finance-recharge-merchant-apply-recommend', '', '', 1, 10, 500105, 'admin', now());
-- 充值资金管理
insert into gl_system_menu values(50020000, '编辑', 'new-finance-manage-recharge-manage-edit', '', '', 1, 0, 500200, 'admin', now());
-- 提现资金管理
insert into gl_system_menu values(50020100, '编辑', 'new-finance-manage-withdraw-manage-edit', '', '', 1, 1, 500201, 'admin', now());
-- 资管资金管理
insert into gl_system_menu values(50020200, '添加银行卡', 'new-finance-manage-asset-manage-edit', '', '', 1, 0, 500202, 'admin', now());
-- 资管预警设置
insert into gl_system_menu values(50020300, '修改', 'new-finance-manage-early-warning-manage-update', '', '', 1, 0, 500203, 'admin', now());
-- 资金调整
insert into gl_system_menu values(50030000, '调整申请', 'new-finance-adjust-record-apple', '', '', 1, 0, 500300, 'admin', now());
insert into gl_system_menu values(50030001, '导出', 'new-finance-adjust-record-export', '', '', 1, 1, 500300, 'admin', now());
insert into gl_system_menu values(50030001, '一审', 'new-finance-adjust-record-firstCheck', '', '', 1, 1, 500300, 'admin', now());
insert into gl_system_menu values(50030001, '二审', 'new-finance-adjust-record-secondCheck', '', '', 1, 1, 500300, 'admin', now());
-- 充值对账报表
insert into gl_system_menu values(50040000, '导出全部明细', 'new-finance-report-recharge-all-export', '', '', 1, 0, 500400, 'admin', now());
insert into gl_system_menu values(50040001, '导出明细', 'new-finance-report-recharge-export', '', '', 1, 1, 500400, 'admin', now());
-- 提现对账报表
insert into gl_system_menu values(50040100, '导出全部明细', 'new-finance-report-withdraw-all-export', '', '', 1, 0, 500401, 'admin', now());
insert into gl_system_menu values(50040101, '导出明细', 'new-finance-report-withdraw-export', '', '', 1, 1, 500401, 'admin', now());