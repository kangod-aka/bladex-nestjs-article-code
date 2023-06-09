import { DynamicModule, Module} from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
    // 导入动态模块，静态的会出很多问题，比如环境变量读取之类的
    // 所以以传入配置函数的方式而不是直接传入配置
    static forRoot(configRegister: () => TypeOrmModuleOptions): DynamicModule {
        return {
            global: true,
            module: DatabaseModule,
            imports: [TypeOrmModule.forRoot(configRegister())],
        };
    }
}
