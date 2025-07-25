"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api', {
        exclude: [{ path: '', method: common_1.RequestMethod.GET }],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Romania Endpoints API')
        .setDescription('API for Romanian counties and localities data\n\n**Rate Limiting:** 1 request per second per IP address')
        .setVersion('1.0')
        .addTag('counties', 'Romanian counties operations')
        .addTag('localities', 'Romanian localities operations')
        .addTag('postal-codes', 'Romanian postal codes operations')
        .addTag('health', 'Health check operations')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3010;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Landing page: http://localhost:${port}/`);
    console.log(`API endpoints available at: http://localhost:${port}/api/`);
    console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
    console.log(`Rate limiting: 1 request per second per IP`);
}
bootstrap();
//# sourceMappingURL=main.js.map