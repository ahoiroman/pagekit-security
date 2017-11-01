window.settings = {

	el: '#settings',

	data: {
		config: $data.config,
		newWhitelist: '',
		newHoneypotUrl: ''
	},

	methods: {

		save: function () {
			this.$http.post('admin/security/save', {config: this.config}, function () {
				this.$notify('Settings saved.');
			}).error(function (data) {
				this.$notify(data, 'danger');
			});
		},
		addIP: function add(e) {
			e.preventDefault();
			if (!this.newWhitelist) return;

			this.config.whitelist.push(this.newWhitelist);
			this.newWhitelist = '';
		},
		removeIP: function (ip) {
			this.config.whitelist.$remove(ip);
		},
		addHoneypot: function add(e) {
			e.preventDefault();
			if (!this.newHoneypotUrl) return;

			this.config.jails.honeypot.honeypots.push(this.newHoneypotUrl);
			this.newHoneypotUrl = '';
		},
		removeHoneypot: function (honeypot) {
			this.config.jails.honeypot.honeypots.$remove(honeypot);
		},
		editHoneypots: function () {
			this.$refs.modal.open();
		}

	},
	components: {}
};

Vue.ready(window.settings);