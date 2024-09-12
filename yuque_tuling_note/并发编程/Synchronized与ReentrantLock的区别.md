`Synchronized`和`ReentrantLock`都是Java中用于实现线程同步的机制，它们各有优缺点和适用场景。以下是它们的比较和适用示例：

### 相似之处

1. **线程安全**：两者都可以用于实现对临界区的保护，从而实现线程安全。
2. **可重入性**：两者都支持可重入性，允许一个线程多次获取同一把锁而不会发生死锁。
3. **互斥锁**：本质上都是互斥锁，确保在同一时刻只有一个线程能执行被同步的代码块。

### 区别

1. **灵活性**：
    - `synchronized`是Java语言的内置特性，使用简单，但功能有限。
    - `ReentrantLock`是一个类，提供了更高级的锁功能，例如：可中断的锁获取、超时获取锁、非阻塞尝试获取锁以及可实现更复杂的同步结构。
2. **性能**：
    - 在较低竞争时，`synchronized`会自动使用优化，比如锁消除和锁粗化，使得它的性能在某些情况下可能高于`ReentrantLock`。
    - `ReentrantLock`可能在高竞争下表现更好，因为它可以提供非公平和公平锁模式，公平模式会严格按照请求锁的顺序来分配锁。
3. **实现的功能**：
    - `ReentrantLock`提供了更多控制功能，如`lock()`、`unlock()`方法，可在任何位置灵活调用。而`synchronized`在语法上是强制块结束时锁自动释放。
    - `ReentrantLock`提供`tryLock()`和`lockInterruptibly()`方法，以响应中断和超时。
4. **条件变量**：
    - `ReentrantLock`具有与之关联的Condition对象，可以搭配lock来更细粒度的控制线程通信。
    - `synchronized`配合`Object`的`wait()`和`notify()`/`notifyAll()`来进行线程之间的通信，但不如`Condition`灵活。

### 示例

#### 使用 `synchronized`

```java
public class SynchronizedExample {  
    private int count = 0;  

    public synchronized void increment() {  
        count++;  
    }  

    public synchronized int getCount() {  
        return count;  
    }  
}
```

#### 使用 `ReentrantLock`

```java
import java.util.concurrent.locks.ReentrantLock;  

public class ReentrantLockExample {  
    private int count = 0;  
    private final ReentrantLock lock = new ReentrantLock();  

    public void increment() {  
        lock.lock(); // 锁定  
        try {  
            count++;  
        } finally {  
            lock.unlock(); // 确保释放锁  
        }  
    }  

    public int getCount() {  
        lock.lock();  
        try {  
            return count;  
        } finally {  
            lock.unlock();  
        }  
    }  
}
```

### 适用场景

- `**synchronized**`：适用于简单的同步需求。由于其语法简单且嵌入在Java语言中，特别适合锁定范围与方法等价的情况。小规模、多线程竞争不高的情况下表现优异。适合开发者不想处理锁的复杂生命周期时使用。
- `**ReentrantLock**`：适用于需要更高级的同步控制，或者锁定范围与方法不同时。特别是在需要公平锁、可中断锁操作、尝试获取带超时功能的锁，或者需要多个条件等待时，应选择`ReentrantLock`。当系统规模较大、线程数较多，且具有复杂同步需求的情境时表现突出。

选择一个合适的锁机制，将有助于提升应用程序的性能并简化并发代码的编写。
