window.bans = {

	el: '#bans',

	data: function () {
		return _.merge({
			bans: false,
			config: {
				filter: this.$session.get('bans.filter', {order: 'date desc', limit: 25})
			},
			pages: 0,
			count: '',
			selected: []
		}, window.$data);
	},
	ready: function () {
		this.resource = this.$resource('api/security/ban{/id}');
		this.$watch('config.page', this.load, {immediate: true});
	},
	watch: {
		'config.filter': {
			handler: function (filter) {
				if (this.config.page) {
					this.config.page = 0;
				} else {
					this.load();
				}

				this.$session.set('bans.filter', filter);
			},
			deep: true
		}
	},
	computed: {
		statusOptions: function () {
			var options = _.map(this.$data.statuses, function (status, id) {
				return {text: status, value: id};
			});

			return [{label: this.$trans('Filter by'), options: options}];
		}
	},
	methods: {
		active: function (ban) {
			return this.selected.indexOf(ban.id) != -1;
		},
		save: function (ban) {
			this.resource.save({id: ban.id}, {ban: ban}).then(function () {
				this.load();
				this.$notify('Ban saved.');
			});
		},
		status: function (status) {

			var bans = this.getSelected();

			bans.forEach(function (ban) {
				ban.status = status;
			});

			this.resource.save({id: 'bulk'}, {bans: bans}).then(function () {
				this.load();
				this.$notify('Bans saved.');
			});
		},
		toggleStatus: function (ban) {
			ban.status = ban.status === 1 ? 2 : 1;
			this.save(ban);
		},
		remove: function () {

			this.resource.delete({id: 'bulk'}, {ids: this.selected}).then(function () {
				this.load();
				this.$notify('Bans deleted.');
			});
		},
		copy: function () {

			if (!this.selected.length) {
				return;
			}

			this.resource.save({id: 'copy'}, {ids: this.selected}).then(function () {
				this.load();
				this.$notify('Bans copied.');
			});
		},
		load: function () {
			this.resource.query({filter: this.config.filter, page: this.config.page}).then(function (res) {

				var data = res.data;

				this.$set('bans', data.bans);
				this.$set('pages', data.pages);
				this.$set('count', data.count);
				this.$set('selected', []);
			});
		},
		getSelected: function () {
			return this.bans.filter(function (ban) {
				return this.selected.indexOf(ban.id) !== -1;
			}, this);
		},
		removeBans: function () {
			this.resource.delete({id: 'bulk'}, {ids: this.selected}).then(function () {
				this.load();
				this.$notify('Bans(s) deleted.');
			});
		},
		getStatusText: function (ban) {
			return this.statuses[ban.status];
		}
	},
	components: {}
};
Vue.ready(window.bans);
