"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const common_1 = require("@nestjs/common");
const Config = require("config");
const swagger_1 = require("@nestjs/swagger");
const channel_module_1 = require("./channel/channel.module");
const user_module_1 = require("./user/user.module");
const people_module_1 = require("./people/people.module");
async function bootstrap(config, swaggerConfig) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({ logger: true }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addTag(swaggerConfig.tag)
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, options, {
        include: [channel_module_1.ChannelModule, user_module_1.UserModule, people_module_1.PeopleModule],
    });
    swagger_1.SwaggerModule.setup(swaggerConfig.path, app, swaggerDocument);
    await app.listen(config.port, config.host);
    app.enableCors();
    common_1.Logger.log(`Application served at http://${config.host}:${config.port}`, 'bootstrap');
}
bootstrap(Config.get('server'), Config.get('swagger'));
//# sourceMappingURL=main.js.map