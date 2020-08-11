package com.diamond;

import com.diamond.utils.DiyUUID;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DocsApplicationTests {

    @Test
    void contextLoads() {
        System.out.println(DiyUUID.generateUserID());
    }

}
