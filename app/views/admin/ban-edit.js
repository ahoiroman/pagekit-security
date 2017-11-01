window.ban = {

	el: '#ban',

	data: function () {
		return {
			data: window.$data,
			ban: window.$data.ban,
			sections: []
		}
	},

	created: function () {

		var sections = [];

		_.forIn(this.$options.components, function (component, name) {

			var options = component.options || {};

			if (options.section) {
				sections.push(_.extend({name: name, priority: 0}, options.section));
			}

		});

		this.$set('sections', _.sortBy(sections, 'priority'));

		this.resource = this.$resource('api/security/ban{/id}');
	},

	ready: function () {
		this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content});
	},

	methods: {

		save: function () {
			var data = {ban: this.ban, id: this.ban.id};

			this.$broadcast('save', data);

			this.resource.save({id: this.ban.id}, data).then(function (res) {

				var data = res.data;

				if (!this.ban.id) {
					window.history.replaceState({}, '', this.$url.route('admin/security/ban/edit', {id: data.ban.id}))
				}

				this.$set('ban', data.ban);

				this.$notify('Ban saved.');

			}, function (res) {
				this.$notify(res.data, 'danger');
			});
		}

	},

	components: {
		settings: require('../../components/ban-edit.vue')
	}
};

Vue.ready(window.ban);