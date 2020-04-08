const _windowWidth = wx.getSystemInfoSync().windowWidth;

interface IData {
	_slideWidth: number;
	_endX: number;
	_startX: number;
	_threshold: number;
	_viewWidth: number;
}

/**
 * 滑动列表控件
 */
Component({
	/**
	 * 组件的属性列表
	 */
	options: {
		multipleSlots: true
	},
	properties: {
		//  组件显示区域的高度
		height: {
			type: Number,
			value: 0
		},
		//  组件滑动显示区域的宽度
		slideWidth: {
			type: Number,
			value: 0
		},
		//  组件显示区域的宽度
		wid: String,
		width: {
			type: Number,
			value: _windowWidth
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		//  movable-view是否可以出界
		out: false,
		viewWidth: _windowWidth,
		//  movable-view偏移量
		x: 0,
	},

	/**
	 * 组件的方法列表
	 */
	//    获取右侧滑动显示区域的宽度
	ready() {
		const query = wx.createSelectorQuery().in(this);
		query.select('.right').boundingClientRect((res: wx.NodesRefRect) => {
			const t = this as unknown as IData;
			t._slideWidth = res.width;
			t._threshold = res.width / 2;
			const viewWidth = this.data.width + res.width * (750 / _windowWidth);
			this.setData({
				viewWidth
			});
		}).exec();
	},
	methods: {
		onTouchStart(e: wx.TouchStartEvent) {
			(this as unknown as IData)._startX = e.changedTouches[0].pageX;
		},
		//  当滑动范围超过阈值自动完成剩余滑动
		onTouchEnd(e: wx.TouchEndEvent) {
			const t = this as unknown as IData;
			t._endX = e.changedTouches[0].pageX;
			const { _endX, _startX, _threshold } = t;
			if (_endX > _startX && this.data.out === false && this.data.x === 0) {
				this.triggerEvent('mmwe-close', { wid: this.data.wid }, { bubbles: true });
				return;
			}
			if (_startX - _endX >= _threshold) {
				this.setData({
					x: -t._slideWidth
				});
				this.triggerEvent('mmwe-open', { wid: this.data.wid }, { bubbles: true });
			} else if (_startX - _endX < _threshold && _startX - _endX > 0) {
				this.setData({
					x: 0
				});
				this.triggerEvent('mmwe-close', { wid: this.data.wid }, { bubbles: true });
			} else if (_endX - _startX >= _threshold) {
				this.setData({
					x: 0
				});
				this.triggerEvent('mmwe-close', { wid: this.data.wid }, { bubbles: true });
			} else if (_endX - _startX < _threshold && _endX - _startX > 0) {
				this.setData({
					x: -t._slideWidth
				});
				this.triggerEvent('mmwe-open', { wid: this.data.wid }, { bubbles: true });
			}
		},
		//  根据滑动的范围设定是否允许movable-view出界
		onChange(e: wx.CustomEvent<'change', {
			x: number;
		}>) {
			const t = this as unknown as IData;
			if (!this.data.out && e.detail.x < -t._threshold) {
				this.setData({
					out: true
				});
			} else if (this.data.out && e.detail.x >= -t._threshold) {
				this.setData({
					out: false
				});
			}
		},
		close() {
			this.setData({
				out: false,
				x: 0
			});
		},
		open() {
			const t = this as unknown as IData;
			this.setData({
				out: true,
				x: -t._slideWidth
			});
		}
	}
});
