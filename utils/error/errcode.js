
const ERRCODE = {
	0: {
		status: 200,
		body: {
			errcode: "0",
			errmsg: "ok"
		}
	},
	404: {
		status: 404,
		body: {
			errcode: "404",
			errmsg: "404"
		}
	},
	40001: {
		status: 400,
		body: {
			errcode: "40001",
			errmsg: "参数错误"
		}
	},
	40002: {
		status: 400,
		body: {
			errcode: "40002",
			errmsg: "数据库错误"
		}
	},
	40003: {
		status: 404,
		body: {
			errcode: "40003",
			errmsg: "文件不存在"
		}
	},
	40004: {
		status: 400,
		body: {
			errcode: "40004",
			errmsg: "文件删除失败"
		}
	},
	40005: {
		status: 400,
		body: {
			errcode: "40005",
			errmsg: "数据库错误"
		}
	},
	50000: {
		status: 500,
		body: {
			errcode: "50000",
			errmsg: "服务端错误"
		}
	}
};

function errcode(code, res = {}) {
	return {
		...(ERRCODE[code] || ERRCODE[50000]),
		body: {
			...(ERRCODE[code] || ERRCODE[50000]).body, ...res
		}
	};
}

module.exports = errcode;
