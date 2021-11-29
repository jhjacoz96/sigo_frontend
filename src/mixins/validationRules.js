export const validationRules = {
    data () {
        return {
            validation_rules_name: [v => !!v || this.$t('validate.required', {
                'attribute': 'nombre',
            })],
            validation_rules_phone: [v => !!v || this.$t('validate.required', {
                'attribute': 'telefono',
            })],
            validation_rules_rol: [v => !!v || this.$t('validate.required', {
                'attribute': 'rol',
            })],
            validation_rules_document: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'cédula',
                }),
                v => (v || '').length >= 8 || this.$t('validate.min.numeric', {
                    'attribute': 'cédula',
                    'min': 8,
                }),
            ],
            validation_rules_type_document: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'Tipo de documento',
                }),
            ],
            validation_rules_email: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'correo electrónico',
                }),
                v => /.+@.+/.test(v) || this.$t('validate.email', {
                    'attribute': 'correo electrónico',
                }),
            ],
            validation_rules_password: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'contraseña',
                }),
                v => (v || '').length >= 8 || this.$t('validate.min.numeric', {
                    'attribute': 'contraseña',
                    'min': 8,
                }),
                v => (/[a-z]/.test(v) && /[A-Z]/.test(v) && /[0-9]/.test(v) && /[@$!%*#?&-_]/.test(v)) || this.$t('validate.password.regex', {
                    'attribute': 'contraseña',
                }),
            ],
            validation_rules_password_confirm: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'confirmar contraseña',
                }),
                v => (v || '').length >= 8 || this.$t('validate.min.numeric', {
                    'attribute': 'confirmar contraseña',
                    'min': 8,
                }),
                v => (/[a-z]/.test(v) && /[A-Z]/.test(v) && /[0-9]/.test(v) && /[@$!%*#?&-_]/.test(v)) || this.$t('validate.password.regex', {
                    'attribute': 'confirmar contraseña',
                }),
                v => v === this.password || this.$t('validate.password.confirmed', {
                    'attribute': 'confirmar contraseña',
                }),
            ],
            validation_rules_category: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'categoría',
                }),
            ],
            validation_rules_stock: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'stock',
                }),
            ],
            validation_rules_quantity: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'cantidad',
                }),
                v => (v || 0) > 0 || this.$t('validate.quantity.min', {
                    'attribute': 'cantidad',
                    'min': 0,
                }),
            ],
            validation_rules_price: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'precio',
                }),
                v => v !== '0.00' || this.$t('validate.quantity.min', {
                    'attribute': 'precio',
                    'min': '0.00',
                }),
            ],
            validation_rules_comment: [
                v => (v || '').length <= 250 || this.$t('validate.max.string', {
                    'attribute': 'comentario',
                    'max': 250,
                }),
            ],
            validation_rules_code: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'código',
                }),
            ],
            validation_rules_status: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'status',
                }),
            ],
            validation_rules_type_payment: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'tipo de pago',
                }),
            ],
            validation_rules_client: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'cliente',
                }),
            ],
            validation_rules_provider: [
                v => !!v || this.$t('validate.required', {
                    'attribute': 'proveedor',
                }),
            ],
        }
    },
}
